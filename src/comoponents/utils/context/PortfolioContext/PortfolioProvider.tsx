import React, {useCallback, useContext, useEffect, useState} from "react";
import {LoginContext} from "../LoginContext/LoginContext";
import {PortfolioContext} from "./PortfolioContext";
import {useNavigate} from "react-router-dom";
import {GetPortfolioReq} from "types";

export const PortfolioProvider = ({children}: { children: JSX.Element }) => {
    const [portfolioList, setPortfolioList] = useState<GetPortfolioReq[]>([]);
    const [responseMsg, setResponseMsg] = useState<string | null>(null);
    const loginCtx = useContext(LoginContext);
    const navigate = useNavigate();

    const refreshPortfolio = useCallback(async () => {
        if (loginCtx.token) {
            const res = await fetch(`http://localhost:3000/portfolio`, {
                credentials: "include",
                headers: {
                    jwt: "" + loginCtx.token,
                },
            });
            const data = await res.json();
            if (data.message) {
                if (data.message === "Unauthorized") {
                    return navigate('/auth/login')
                }
                setResponseMsg(data.message);
                setPortfolioList([]);
            } else {
                setPortfolioList(data)
                setResponseMsg(null)
            }
        }
    }, [loginCtx.token])

    useEffect(() => {
        try {
            refreshPortfolio()
        } catch (error) {
            console.log(error)
        }
    }, [refreshPortfolio])


    return <PortfolioContext.Provider
        value={{portfolio: portfolioList, responseMessage: responseMsg, refreshPortfolio: refreshPortfolio}}>
        {children}
    </PortfolioContext.Provider>
};

