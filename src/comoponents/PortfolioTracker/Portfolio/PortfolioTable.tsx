import React, {useContext, useEffect, useState} from "react";
import {CoinListContext} from "../../utils/context/CoinListContext/CoinListContext";
import {PortfolioContext} from "../../utils/context/PortfolioContext/PortfolioContext";
import {Spinner} from "../../common/Spinner/Spinner";
import {PortfolioTableRow} from "./PortfolioTableRow";

import styles from "./Portfolio.module.css";

export const PortfolioTable = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const coinCtx = useContext(CoinListContext);
    const portfolioCtx = useContext(PortfolioContext);

    useEffect(() => {
        setLoading(true);
        try {
            if (portfolioCtx.responseMessage) {
                setLoading(false);
            }
            if (coinCtx.length !== 0) {
                setLoading(false);
            }

        } catch (error) {
            console.log(error);
        }
    }, [coinCtx, portfolioCtx.responseMessage]);

    return <>
        {
            loading ? <div className={styles.portfolioTable__spinner}><Spinner/></div> :
                <table
                    className={`${styles.portfolioTable} ${portfolioCtx.responseMessage ? styles.portfolioTable__responseActive : ""}`}>
                    <thead className={styles.portfolioTable__thead}>
                    <tr>
                        <th></th>
                        <th>Coin</th>
                        <th>Amount</th>
                        <th className={styles.portfolioTable__theadTh__fourth}>Current Price</th>
                        <th className={styles.portfolioTable__theadTh__fifth}>Current Value</th>
                        <th>Profit/Loss</th>
                    </tr>
                    </thead>
                    <tbody>
                    {portfolioCtx.portfolio.map(portfolio => <PortfolioTableRow key={portfolio.coinId} portfolio={portfolio}/>)}
                    </tbody>
                </table>
        }
        {
            portfolioCtx.responseMessage &&
            <div className={styles.coinTable__responseMsg}><p>{portfolioCtx.responseMessage}</p></div>
        }
    </>
};
