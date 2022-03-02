import { createContext, ReactNode, useContext } from "react";
import useEnterpriseAuth from "../hooks/useEnterpriseAuth";

interface EnterpriseContextInterface {
    authenticated: boolean;
    register: Function;
    logout: Function;
    login: Function;
}

const Context = createContext({} as EnterpriseContextInterface);

interface EnterpriseProviderProps {
    children: ReactNode;
}

export function EnterpriseProvider({children}: EnterpriseProviderProps) {
    const { authenticated, register, logout, login } = useEnterpriseAuth();
    
    return (
        <Context.Provider value={{ authenticated, register, logout, login }}>
            {children}
        </Context.Provider>
    );
}

export const useEnterpriseAuthContext = () => useContext( Context );