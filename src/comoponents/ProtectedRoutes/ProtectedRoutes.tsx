import React from "react";
import {Navigate} from "react-router-dom";

export const ProtectedRoute = ({children}: { children: JSX.Element }) => {

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    return <>
        {(token && email) ? children : <Navigate to='/auth/login'/>}
    </>
};
