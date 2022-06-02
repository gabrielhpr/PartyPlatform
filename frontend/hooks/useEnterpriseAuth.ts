// api
import api from "../utils/api";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
//import { useHistory } from "react-router-dom";
import useFlashMessage from './useFlashMessage';

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
    const { setFlashMessage } = useFlashMessage();
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
        let msgText = 'Anúncio cadastrado com sucesso';
        let msgType = 'success';
        try {
            await api.post("/enterprise/ads/create", adData, options)
            .then((response) => {
                return response.data;
            });
            routerNext.push("/Enterprise/ads");
        }
        catch( err ) {
            //console.log( err );
            msgText = err.response.data.message;
            msgType = "error";
        }
        setFlashMessage( msgText, msgType );
    }

    async function registerEnterprise(enterprise: EnterpriseData) {
        let msgText = 'Cadastro realizado com sucesso';
        let msgType = 'success';

        try {
            const data = await api.post("/enterprise/register", enterprise, options)
            .then((response) => {
                return response.data;
            });
            await authEnterprise(data);
        }
        catch(err) {
            // tratar o erro
            //console.log(err);
            msgText = err.response.data.message;
            msgType = "error";
        }
        setFlashMessage( msgText, msgType );
    }

    async function loginEnterprise(enterprise: any) {
        let msgText = 'Login realizado com sucesso';
        let msgType = 'success';
        //console.log(' entrou no login enterprise ');

        try {
            const data = await api.post("/enterprise/login", enterprise)
            .then((response) => {
                return response.data;
            });
            await authEnterprise(data);
        }   
        catch(err) {
            //console.log( err );
            msgText = err.response.data.message;
            msgType = "error";
        }
        setFlashMessage( msgText, msgType );
    }

    async function authEnterprise(data: any) {
        setAuthenticatedEnterprise(true);
        localStorage.removeItem("tokenUser");
        localStorage.setItem("tokenEnterprise", JSON.stringify(data.token));
        routerNext.push("/Enterprise/home");
    }

    async function enterpriseAnswerRate(answerRating: any) {
        let msgText = 'Resposta cadastrada com sucesso';
        let msgType = 'success';

        const token = localStorage.getItem("tokenEnterprise");

        try {
            await api.post("/enterprise/answerRating", answerRating, {
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

    async function logoutEnterprise() {
        const msgText = "Logout realizado com sucesso!";
        const msgType = "success";

        setFlashMessage( msgText, msgType );

        setTimeout(() => {
            setAuthenticatedEnterprise( false );
            localStorage.removeItem("tokenEnterprise");
            api.defaults.headers.common["Authorization"] = "";
            routerNext.push("/Enterprise/enterpriseAccess");
        }, 1500);
    }

    return { authenticatedEnterprise, registerEnterprise, createAd, loginEnterprise, logoutEnterprise, enterpriseAnswerRate };
}

