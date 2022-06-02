// api
import api from "../utils/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFlashMessage from "./useFlashMessage";
//import { useHistory } from "react-router-dom";

interface UserData {
    // Contact Data
    fullName: string;
    email: string;
    phone: string;
   
    // Access Data
    password: string;
    passwordConfirmation: string;
    // About the User
   
    country: string;
    state: string;
    city: string;
}

interface AdData {
    partyMainFocus: string;
    serviceDescription: string;

    photos: string;

    answer1: string;
    answer2: string;
}

export default function useUserAuth() {
    const [authenticatedUser, setAuthenticatedUser] = useState(false);
    const { setFlashMessage } = useFlashMessage();
    // Next Router
    const routerNext = useRouter();

    const options = {
        headers: {"content-type": "multipart/form-data"}
    }

    useEffect(() => {
        const token = localStorage.getItem("tokenUser");
        
        if(token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
            setAuthenticatedUser(true);
        }
    }, []);

    async function registerUser(user: UserData, redirect: boolean = true) {
        let msgText = 'Cadastro realizado com sucesso';
        let msgType = 'success';

        try {
            const data = await api.post("/user/register", user)
            .then((response) => {
                return response.data;
            });
            await authUser(data, redirect);
        }
        catch(err) {
            // tratar o erro
            //console.log(err);
            msgText = err.response.data.message;
            msgType = "error";
        }
        setFlashMessage( msgText, msgType );
    }

    async function loginUser(user: any, redirect: boolean = true) {
        let msgText = 'Login realizado com sucesso';
        let msgType = "success";

        try {
            const data = await api.post("/user/login", user).then((response) => {
                return response.data;
            });
            await authUser(data, redirect);
        }   
        catch(err) {
            //console.log( err );
            msgText = err.response.data.message;
            msgType = "error";
        }
        setFlashMessage( msgText, msgType );
    }

    async function userRate(rating: any) {
        let msgText = 'Avaliação registrada com sucesso';
        let msgType = "success";

        const token = localStorage.getItem("tokenUser");

        try {
            await api.post("/user/rating", rating, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            })
            .then((response) => {

                return response.data;
            });
        }
        catch(err) {
            // Tratar o erro
            //console.log(err);
            msgText = err.response.data.message;
            msgType = "error";
        }
        setFlashMessage( msgText, msgType );

        return msgType;
    }

    async function userSendEmail(emailData: any) {
        let msgText = 'E-mail enviado com sucesso';
        let msgType = "success";

        const token = localStorage.getItem("tokenUser");

        try {
            await api.post("/user/sendEmail", emailData, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            })
            .then((response) => {
                return response.data;
            });
        }
        catch(err) {
            // tratar o erro
            //console.log(err);
            msgText = err.response.data.message;
            msgType = "error";
        }
        setFlashMessage( msgText, msgType );
    }

    async function authUser(data: any, redirect: boolean) {
        setAuthenticatedUser(true);
        localStorage.removeItem("tokenEnterprise");
        localStorage.setItem("tokenUser", JSON.stringify(data.token));
        
        if( redirect == true ) {
            routerNext.push("/User/home");
        }
        return authenticatedUser;
    }

    function logoutUser() {
        const msgText = "Logout realizado com sucesso!";
        const msgType = "success";

        //setFlashMessage(msgText, msgType);
        setFlashMessage( msgText, msgType );

        setTimeout(() => {
            setAuthenticatedUser( false );
            localStorage.removeItem("tokenUser");
            api.defaults.headers.common["Authorization"] = "";
            routerNext.push("/User/userAccess");
        }, 1500);
    }

    return { authenticatedUser, registerUser, loginUser, logoutUser, userRate, userSendEmail };
}

