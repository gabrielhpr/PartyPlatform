import { createContext, ReactNode, useContext } from "react";
import useUserAuth from "../hooks/useUserAuth";

interface UserContextInterface {
    authenticatedUser: boolean;
    registerUser: Function;
    loginUser: Function;
    userRate: Function;
    logoutUser: Function;
}

const Context = createContext({} as UserContextInterface);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({children}: UserProviderProps) {
    const { authenticatedUser, registerUser, loginUser, userRate, logoutUser } = useUserAuth();
    
    return (
        <Context.Provider value={{ authenticatedUser, registerUser, loginUser, userRate, logoutUser }}>
            {children}
        </Context.Provider>
    );
}

export const useUserAuthContext = () => useContext( Context );