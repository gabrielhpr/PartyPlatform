import { createContext, ReactNode, useContext } from "react";
import useUserAuth from "../hooks/useUserAuth";

interface UserContextInterface {
    authenticatedUser: boolean;
    registerUser: (userData:any, redirect?:boolean) => {};
    loginUser: (userData:any, redirect?:boolean) => {};
    userRate: Function;
    userSendEmail: Function;
    logoutUser: Function;
}

const Context = createContext({} as UserContextInterface);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({children}: UserProviderProps) {
    const { authenticatedUser, registerUser, loginUser, userRate, logoutUser, userSendEmail } = useUserAuth();
    
    return (
        <Context.Provider value={{ authenticatedUser, registerUser, loginUser, userRate, logoutUser, userSendEmail }}>
            {children}
        </Context.Provider>
    );
}

export const useUserAuthContext = () => useContext( Context );