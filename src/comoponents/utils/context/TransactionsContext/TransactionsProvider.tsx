import React, {useCallback, useContext, useEffect, useState} from "react";
import {GetTransactionReq} from "types";
import {LoginContext} from "../LoginContext/LoginContext";
import {TransactionsContext} from "./TransactionsContext";
import {useNavigate} from "react-router-dom";

export const TransactionsProvider = ({ children }: { children: JSX.Element }) => {
    const [transactionsList, setTransactionsList] = useState<GetTransactionReq[]>([]);
    const [responseMsg, setResponseMsg] = useState<string | null>(null);
    const loginCtx = useContext(LoginContext);
    const navigate = useNavigate();

    const refreshTransactions = useCallback(async () => {
        if(loginCtx.token) {
            const res = await fetch(`http://localhost:3000/transaction`, {
                credentials: "include",
                headers: {
                    jwt: "" + loginCtx.token,
                },
            });
            const data = await res.json();
            if (data.message) {
                if(data.message === "Unauthorized"){
                    return navigate('/auth/login')
                }
                setResponseMsg(data.message)
                setTransactionsList([])
            } else {
                setTransactionsList(data)
                setResponseMsg(null)
            }
        }
    }, [loginCtx.token])


    useEffect( () => {
        try {
            refreshTransactions()
        } catch (error) {
            console.log(error)
        }

    }, [refreshTransactions])


    return <TransactionsContext.Provider
        value={{transactions: transactionsList, refreshTransactions: refreshTransactions, responseMessage: responseMsg}}>
        {children}
    </TransactionsContext.Provider>
};

