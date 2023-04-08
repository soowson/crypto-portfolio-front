import React, {useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {LoginContext} from "./LoginContext";
import {CheckUserResponse} from "types";


export const AuthProvider = ({children}: { children: JSX.Element }) => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    const checkAccess = useCallback(async () => {
        if (token) {
            const res = await fetch(`http://localhost:3000/user/${email}`);
            const data = await res.json() as CheckUserResponse;
            if (!data.authorized) {
                localStorage.removeItem('token');
                localStorage.removeItem('email');
            }
        }
    }, [token, email])

    useEffect(() => {
        checkAccess()
    }, [checkAccess])
    const handleLogin = () => {
        navigate(`/portfolio`)
    }

    const value = {
        token: token ? token : undefined,
        onLogin: handleLogin,
    }

    return <LoginContext.Provider value={value}>
        {children}
    </LoginContext.Provider>
};
