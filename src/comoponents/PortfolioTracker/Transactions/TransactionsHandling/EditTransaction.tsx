import React, {Fragment, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {TransactionsContext} from "../../../utils/context/TransactionsContext/TransactionsContext";
import {Card} from "../../../common/Card/Card";
import {FormikEditTransaction} from "../../../FormikContainer/FormikTransaction/FormikEditTransaction";
import {Spinner} from "../../../common/Spinner/Spinner";

import styles from "../TransactionsHandling/TransactionHandling.module.css";

export const EditTransaction = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {transactionId} = useParams();
    const transactionsCtx = useContext(TransactionsContext);


    useEffect(() => {
        if (!transactionsCtx) {
            setLoading(true);
        } else setLoading(false);

    }, [transactionsCtx]);

    const transactionType = transactionsCtx?.transactions.filter(transaction => transaction.id === transactionId).map(element => element.transactionType)[0];

    const coinId = transactionsCtx?.transactions.filter(transaction => transaction.id === transactionId).map(element => element.coinId)[0];

    const coinName = transactionsCtx?.transactions.filter(transaction => transaction.id === transactionId).map(element => element.coinName)[0];

    const price = transactionsCtx?.transactions.filter(transaction => transaction.id === transactionId).map(element => element.price)[0];

    const amount = transactionsCtx?.transactions.filter(transaction => transaction.id === transactionId).map(element => element.amount)[0];

    const notes = transactionsCtx?.transactions.filter(transaction => transaction.id === transactionId).map(element => element.notes)[0];

    return <Card>
        {
            loading ? <Spinner/> :
                <Fragment>
                    <div className={styles.transaction__title}>EDIT TRANSACTION</div>
                    <FormikEditTransaction
                        transactionType={transactionType}
                        coinId={coinId}
                        coinName={coinName}
                        price={price}
                        amount={amount}
                        notes={notes}
                    />
                </Fragment>
        }
    </Card>
};
