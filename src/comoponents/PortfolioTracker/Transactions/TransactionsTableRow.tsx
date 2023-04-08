import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {numberApproximation, numberLook, amountLook} from "../../utils/helperFunctions";
import {DeleteTransactionResponse, GetTransactionReq} from "types"
import {CoinListContext} from "../../utils/context/CoinListContext/CoinListContext";
import {TransactionsContext} from "../../utils/context/TransactionsContext/TransactionsContext";
import {LoginContext} from "../../utils/context/LoginContext/LoginContext";
import {PortfolioContext} from "../../utils/context/PortfolioContext/PortfolioContext";

import styles from "./Transactions.module.css";

interface Props {
    transaction: GetTransactionReq;
}

export const TransactionsTableRow = ({transaction}: Props) => {
    const coinCtx = useContext(CoinListContext);
    const transactionsCtx = useContext(TransactionsContext);
    const portfolioCtx = useContext(PortfolioContext);
    const loginCtx = useContext(LoginContext);
    const navigate = useNavigate();

    const deleteTransactionHandler = async (event: React.MouseEvent<Element, MouseEvent>) => {
        event.preventDefault();
        if (!window.confirm(`Are you sure you want to delete transaction with ${transaction.coinName}?`)) {
            return;
        }
        const res = await fetch(`http://localhost:3000/transaction/${transaction.id}/${transaction.coinId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                jwt: "" + loginCtx.token,
            },
        })
        const data = await res.json() as DeleteTransactionResponse;
        if (!data.isSuccess) {
            alert(`Something went wrong...`)
        } else if (data.isSuccess) {
            alert(`The transaction with id ${data.id} has been deleted.`);
            transactionsCtx?.refreshTransactions();
            portfolioCtx.refreshPortfolio();
        }
    };

    const editTransactionHandler = () => {
        return navigate(`/transaction/edit-transaction/${transaction.id}`);
    };

    const coinImage = coinCtx.filter(coin => coin.id === transaction.coinId).map(element => element.image);
    const currentPrice = coinCtx.filter(coin => coin.id === transaction.coinId
    ).map(element => element.current_price);
    const currentValue = Number(currentPrice) * Number(transaction.amount);
    const profit = Number(currentValue) - Number(transaction.totalPrice);
    const profitPercentage = Number(((profit) / Number(transaction.totalPrice)) * 100);

    return <>
        <tr className={styles.transactionsTable__tbodyTr}>
            <td className={styles.transactionsTable__tbodyTd__first}>{transaction.transactionType}</td>
            <td className={styles.transactionsTable__tbodyTd__second}><img
                className={styles.transactionsTable__coinImage} alt={transaction.coinName} src={coinImage[0]}/></td>
            <td>{`${amountLook(transaction.amount)} ${transaction.coinName}`}</td>
            <td className={styles.transactionsTable__tbodyTd__fourth}>{`$${numberApproximation(transaction.totalPrice)}`}</td>
            <td className={styles.transactionsTable__tbodyTd__fifth}>{`$${numberApproximation(currentValue)}`}</td>
            <td>{`$${numberApproximation(transaction.price)}`}</td>
            <td style={{color: numberLook(Number(profitPercentage))}}>
                <div>
                    <p>{`$${numberApproximation(profit)}`}</p>
                    <p>{`${numberApproximation(profitPercentage)}%`}</p>
                </div>
            </td>
            <td>
                <div className={styles.transactionsTable__buttons}>
                    <p
                        className={styles.transactionsTable__button}
                        onClick={editTransactionHandler}
                    >
                        EDIT
                    </p>
                    <p
                        className={styles.transactionsTable__button}
                        onClick={deleteTransactionHandler}
                    >
                        DELETE
                    </p>
                </div>
            </td>
        </tr>
    </>
};

