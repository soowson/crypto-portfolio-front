import React, {useContext, useEffect, useState} from "react";
import {Navigation} from "../../common/Navigation/Navigation"
import {Spinner} from "../../common/Spinner/Spinner";
import {TransactionsTableRow} from "./TransactionsTableRow";
import {PortfolioValues} from "../Portfolio/PortfolioValues";
import {CoinListContext} from "../../utils/context/CoinListContext/CoinListContext";
import {TransactionsContext} from "../../utils/context/TransactionsContext/TransactionsContext";

import styles from "./Transactions.module.css";

export const TransactionsTable = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const coinCtx = useContext(CoinListContext);
    const transactionsCtx = useContext(TransactionsContext);

    useEffect(() => {
        setLoading(true)
        try {
            if (transactionsCtx?.responseMessage) {
                setLoading(false)
            }

            if (coinCtx.length !== 0) {
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }, [coinCtx, transactionsCtx]);


    return <div className={styles.transactionsPage}>
        <PortfolioValues/>
        <Navigation/>
        <section className={styles.transactionsTableSection}>
            {
                loading ? <Spinner/> :
                    <table
                        className={`${styles.transactionsTable} ${transactionsCtx?.responseMessage ? styles.transactionsTable__responseMessage : ""}`}>
                        <thead className={styles.transactionsTable__thead}>
                        <tr>
                            <th>Type</th>
                            <th></th>
                            <th>Amount</th>
                            <th className={styles.transactionsTable__theadTh__fourth}>Worth</th>
                            <th className={styles.transactionsTable__theadTh__fifth}>Current Value</th>
                            <th>Price</th>
                            <th>Profit/Loss</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactionsCtx?.transactions.map(transaction => <TransactionsTableRow key={transaction.id}
                                                                                                transaction={transaction}/>)}
                        </tbody>
                    </table>
            }
            {
                transactionsCtx?.responseMessage &&
                <div className={styles.transactionsTable_responseMsg}><p>{transactionsCtx?.responseMessage}</p></div>
            }
        </section>

    </div>
}
