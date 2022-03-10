import { createContext, ReactNode, useContext } from "react";
import useEnterpriseAuth from "../hooks/useEnterpriseAuth";

interface EnterpriseContextInterface {
    authenticated: boolean;
    register: Function;
    createAd: Function;
    login: Function;
    logout: Function;
}

const Context = createContext({} as EnterpriseContextInterface);

interface EnterpriseProviderProps {
    children: ReactNode;
}

export function EnterpriseProvider({children}: EnterpriseProviderProps) {
    const { authenticated, register, createAd, login, logout } = useEnterpriseAuth();
    
    return (
        <Context.Provider value={{ authenticated, register, createAd, login, logout }}>
            {children}
        </Context.Provider>
    );
}

export const useEnterpriseAuthContext = () => useContext( Context );