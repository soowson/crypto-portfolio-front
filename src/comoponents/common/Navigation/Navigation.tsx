import {useLocation, useNavigate} from "react-router-dom";
import React from "react";


import styles from "./Navigation.module.css";


export const Navigation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const transactionActive = location.pathname.includes("transaction");

    const viewPortfolio = () => {
        return navigate(`/portfolio`);
    };
    const addTransaction = () => {
        return navigate('/transaction/add-transaction')
    };
    const viewTransactions = () => {
        return navigate(`/transaction`)
    };

    return <nav className={styles.portfolioNavigation__container}>
        <div className={styles.portfolioNavigation}>
            <div
                className={`${styles.portfolioNavigation__item} ${!transactionActive ? styles.portfolioNavigation__item__active : ""}`}
                onClick={viewPortfolio}>HOLDINGS
            </div>
            <div
                className={`${styles.portfolioNavigation__item} ${transactionActive ? styles.portfolioNavigation__item__active : ""}`}
                onClick={viewTransactions}>TRANSACTIONS
            </div>
            <div className={styles.portfolioNavigation__item2} onClick={addTransaction}>ADD TRANSACTION</div>
        </div>
    </nav>
};

