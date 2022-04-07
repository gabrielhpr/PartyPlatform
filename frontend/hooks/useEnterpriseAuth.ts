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

interface AdData {
    partyMainFocus: string;
    serviceDescription: string;

    photos: string;

    answer1: string;
    answer2: string;
}

export default function useEnterpriseAuth() {

    const [authenticatedEnterprise, setAuthenticatedEnterprise] = useState(false);
    // Next Router
    const routerNext = useRouter();

    const options = {
        headers: {"content-type": "multipart/form-data"}
    }

    useEffect(() => {
        const token = localStorage.getItem("tokenEnterprise");
        
        if(token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
            setAuthenticatedEnterprise(true);
        }
    }, []);

    async function createAd(adData: AdData) {
        try {
            await api.post("/enterprise/ads/create", adData, options)
            .then((response) => {
                return response.data;
            });
            routerNext.push("/Enterprise/ads");
        }
        catch( err ) {
            console.log( err );
        }
    }

    async function registerEnterprise(enterprise: EnterpriseData) {
        try {
            const data = await api.post("/enterprise/register", enterprise, options)
            .then((response) => {
                return response.data;
            });
            await authEnterprise(data);
        }
        catch(err) {
            // tratar o erro
            console.log(err);
        }
    }

    async function loginEnterprise(enterprise: any) {
        let msgText = 'Login realizado com sucesso';
        let msgType = "success";

        try {
            const data = await api.post("/enterprise/login", enterprise).then((response) => {
                return response.data;
            });
            await authEnterprise(data);
        }   
        catch(err) {
            console.log( err );
            // msgText = err.response.data.message;
            // msgType = "error";
        }
    }

    async function authEnterprise(data: any) {
        setAuthenticatedEnterprise(true);
        localStorage.removeItem("tokenUser");
        localStorage.setItem("tokenEnterprise", JSON.stringify(data.token));
        routerNext.push("/Enterprise/home");
    }

    async function logoutEnterprise() {
        const msgText = "Logout realizado com sucesso!";
        const msgType = "success";

        setAuthenticatedEnterprise( false );
        localStorage.removeItem("tokenEnterprise");
        api.defaults.headers.common["Authorization"] = "";

        routerNext.push("/Enterprise/enterpriseAccess");
        //setFlashMessage(msgText, msgType);
    }

    return { authenticatedEnterprise, registerEnterprise, createAd, loginEnterprise, logoutEnterprise };
}

