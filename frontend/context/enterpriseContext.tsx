import { createContext, ReactNode, useContext } from "react";
import useEnterpriseAuth from "../hooks/useEnterpriseAuth";

interface EnterpriseContextInterface {
    authenticatedEnterprise: boolean;
    registerEnterprise: Function;
    createAd: Function;
    loginEnterprise: Function;
    logoutEnterprise: Function;
}

const Context = createContext({} as EnterpriseContextInterface);

interface EnterpriseProviderProps {
    children: ReactNode;
}

export function EnterpriseProvider({children}: EnterpriseProviderProps) {
    const { authenticatedEnterprise, registerEnterprise, createAd, loginEnterprise, logoutEnterprise } = useEnterpriseAuth();
    
    return (
        <Context.Provider value={{ authenticatedEnterprise, registerEnterprise, createAd, loginEnterprise, logoutEnterprise }}>
            {children}
        </Context.Provider>
    );
}

export const useEnterpriseAuthContext = () => useContext( Context );