// api
import api from "../utils/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
    // Next Router
    const routerNext = useRouter();

    const options = {
        headers: {"content-type": "multipart/form-data"}
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if(token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
            setAuthenticatedUser(true);
        }
    }, []);

    async function registerUser(user: UserData) {
        try {
            const data = await api.post("/user/register", user)
            .then((response) => {
                return response.data;
            });
            await authUser(data);
        }
        catch(err) {
            // tratar o erro
            console.log(err);
        }
    }

    async function loginUser(user: any) {
        let msgText = 'Login realizado com sucesso';
        let msgType = "success";

        try {
            const data = await api.post("/user/login", user).then((response) => {
                return response.data;
            });
            await authUser(data);
        }   
        catch(err) {
            console.log( err );
            // msgText = err.response.data.message;
            // msgType = "error";
        }
    }

    async function authUser(data: any) {
        setAuthenticatedUser(true);
        localStorage.setItem("token", JSON.stringify(data.token));
        routerNext.push("/User/home");
    }

    function logoutUser() {
        const msgText = "Logout realizado com sucesso!";
        const msgType = "success";

        setAuthenticatedUser( false );
        localStorage.removeItem("token");
        api.defaults.headers.common["Authorization"] = "";

        routerNext.push("/User/userAccess");
        //setFlashMessage(msgText, msgType);
    }

    return { authenticatedUser, registerUser, loginUser, logoutUser };
}

