"use client"
import { createContext, useState } from "react";

export const AuthenicationProvider=createContext();

const Auth=({children})=>{
    const [userState,setUserState]=useState(false);
    const [userData,setUserData]=useState('');

    return(
        <AuthenicationProvider.Provider value={{userData,userState,setUserData,setUserState}}>
            {children}
        </AuthenicationProvider.Provider>
    )
}

export default Auth;