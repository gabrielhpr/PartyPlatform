// api
import api from "../utils/api";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
//import { useHistory } from "react-router-dom";

interface EnterpriseData {
    // Contact Data
    fullName: string;
    email: string;
    phone: string;
    whatsapp?: string;
    // Access Data
    password: string;
    passwordConfirmation: string;
    // About the enterprise
    enterpriseName: string;
    country: string;
    state: string;
    city: string;
    address: string;
    addressNumber: number;
    // Enterprise Social Media
    instagram?: string;
    facebook?: string;
    website?: string;
    
    partyMainFocus: string;
    serviceDescription: string;
    enterpriseCategory: string;
    enterpriseSpecificCategory: string;

    photos: string;

    answer1: string;
    answer2: string;
}

export default function useEnterpriseAuth() {

    const [authenticated, setAuthenticated] = useState(false);
    // Next Router
    const routerNext = useRouter();

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
        
    //     if(token) {
    //         api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
    //         setAuthenticated(true);
    //     }
    // }, []);
    const options = {
        headers: {"content-type": "multipart/form-data"}
    }

    async function register(enterprise: EnterpriseData) {
        try {
            const data = await api.post("/enterprise/register", enterprise, options)
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

    async function authUser(data: any) {
        setAuthenticated(true);
        //localStorage.setItem("token", JSON.stringify(data.token));
        //history.push("/overview");
        routerNext.push("/");
    }

    async function login(user: any) {
        let msgText = 'Login realizado com sucesso';
        let msgType = "success";

        try {
            const data = await api.post("/users/login", user).then((response) => {
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

    function logout() {
        const msgText = "Logout realizado com sucesso!";
        const msgType = "success";

        setAuthenticated( false );
        localStorage.removeItem("token");
        api.defaults.headers.common["Authorization"] = "";

        routerNext.push("/");
        //setFlashMessage(msgText, msgType);
    }

    return { authenticated, register, logout, login };
}

