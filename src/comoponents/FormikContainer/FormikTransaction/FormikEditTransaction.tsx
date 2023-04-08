import React, {useContext} from "react";
import {Form, Formik} from "formik";
import {format} from "date-fns";
import {useNavigate, useParams} from "react-router-dom";
import {TransactionsContext} from "../../utils/context/TransactionsContext/TransactionsContext";
import {EditTransactionReq} from "types";
import {PortfolioContext} from "../../utils/context/PortfolioContext/PortfolioContext";
import {LoginContext} from "../../utils/context/LoginContext/LoginContext";
import {TransactionValidationSchema} from "../../utils/FormikValidationSchema/ValidationSchema";
import {FormikControl} from "../FormikControl";
import {Button} from "../../common/Button/Button";
import styles from '../../PortfolioTracker/Transactions/TransactionsHandling/TransactionHandling.module.css';


interface Props {
    transactionType: string | undefined;
    coinId: string | undefined;
    coinName: string | undefined;
    price: number | undefined;
    amount: number | undefined;
    notes: string | undefined;
}

export const FormikEditTransaction = ({transactionType, coinId, coinName, price, amount, notes}: Props) => {
    const {transactionId} = useParams();
    const navigate = useNavigate();
    const loginCtx = useContext(LoginContext);
    const transactionsCtx = useContext(TransactionsContext);
    const portfolioCtx = useContext(PortfolioContext);

    const viewTransactions = () => {
        return navigate(`/transaction`)
    };

    const initialValues: EditTransactionReq = {
        transactionType: transactionType,
        coinId: coinId,
        coinName: coinName,
        price: price,
        amount: amount,
        date: format(new Date(), "yyyy-MM-dd"),
        time: format(new Date().getTime(), "HH:mm"),
        notes: notes,
    };

    const onSubmit = async (values: EditTransactionReq) => {
        const totalPrice = Number(values.price) * Number(values.amount)
        try {
            const res = await fetch(`http://localhost:3000/transaction/${transactionId}`, {
                method: 'PATCH',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    jwt: "" + loginCtx.token,
                },
                body: JSON.stringify({
                    ...values,
                    totalPrice,
                    id: transactionId,
                })
            });
            transactionsCtx?.refreshTransactions();
            portfolioCtx.refreshPortfolio();
            viewTransactions();
        } catch (error) {
            console.log(error)
        }
    };

    return <>
        <Formik
            initialValues={initialValues}
            validationSchema={TransactionValidationSchema}
            onSubmit={onSubmit}
        >
            {({
                  values,
                  isValid,
                  isSubmitting,
              }) => (
                <Form className={styles.editTransaction__form}>
                    <FormikControl
                        control="select"
                        name="transactionType"
                        type=""
                        label="TRANSACTION"
                        value="buy"
                    />
                    <FormikControl
                        control="input"
                        name="coinName"
                        type="text"
                        label="COIN"
                        disabled="disabled"
                    />
                    <div className={styles.transaction__detailsWrapper}>
                        <FormikControl
                            control="smallInput"
                            name="amount"
                            type="number"
                            label="AMOUNT"
                            placeholder="Amount"
                        />
                        <FormikControl
                            control="smallInput"
                            name="price"
                            type="number"
                            label="PRICE $"
                            placeholder="Price"
                        />
                    </div>
                    <div className={styles.transaction__detailsWrapper}>
                        <FormikControl
                            control="date"
                            name="date"
                            type="date"
                            label="DATE"
                            placeholder="Date"
                            value={values.date}
                        />
                        <FormikControl
                            control="time"
                            name="time"
                            type="time"
                            label="TIME"
                        />
                    </div>
                    <FormikControl
                        control="textarea"
                        name="notes"
                        type=""
                        label="NOTES"
                    />
                    <div className={styles.transaction__buttons}>
                        <Button
                            type="button"
                            className={styles.transaction__cancelButton}
                            onClick={viewTransactions}
                        >
                            CANCEL
                        </Button>
                        <Button
                            type="submit"
                            className={`${styles.transaction__saveButton} ${isSubmitting
                                ? styles.button__loading : ""} ${!isValid ? styles.button__disabled : ""}`}
                            onClick={undefined}
                        >
                            SAVE
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    </>
}
