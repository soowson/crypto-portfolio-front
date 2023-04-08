import React, {useContext, useState} from "react";
import {Field, Form, Formik, ErrorMessage} from "formik";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns";
import {AddTransactionReq} from "types";
import {CoinReq} from "types";
import {PortfolioContext} from "../../utils/context/PortfolioContext/PortfolioContext";
import {TransactionsContext} from "../../utils/context/TransactionsContext/TransactionsContext";
import {LoginContext} from "../../utils/context/LoginContext/LoginContext";
import {TransactionValidationSchema} from "../../utils/FormikValidationSchema/ValidationSchema";
import {FormikControl} from "../FormikControl";
import {errorMsg} from "../../TextError/TextError";
import {Button} from "../../common/Button/Button";

import styles from '../../PortfolioTracker/Transactions/TransactionsHandling/TransactionHandling.module.css';

interface Props {
    coinList: CoinReq[] | [];
    onLoadList: () => {};
    onSetCoinList: () => void;
    onSelectCoinMsg: (value: boolean) => void;
}

const initialValues: AddTransactionReq = {
    transactionType: 'buy',
    coinId: '',
    coinName: '',
    price: 0,
    amount: 0,
    date: format(new Date(), "yyyy-MM-dd"),
    time: format(new Date().getTime(), "HH:mm"),
    notes: '',
}

export const FormikAddTransaction = ({coinList, onLoadList, onSelectCoinMsg, onSetCoinList}: Props) => {
    const navigate = useNavigate();
    const portfolioCtx = useContext(PortfolioContext);
    const transactionsCtx = useContext(TransactionsContext);
    const loginCtx = useContext(LoginContext);
    const [coinFromList, setCoinFromList] = useState<boolean>(false);

    const handleSearch = (coinName: string) => {
        return coinName === '' ? [] : coinList.filter(coin => coin.id.toLowerCase().includes(coinName) || coin.symbol.toLowerCase().includes(coinName) || coin.name.includes(coinName))
    };

    const viewTransactions = () => {
        return navigate(`/transaction`)
    };

    const onSubmit = async (values: AddTransactionReq) => {
        if (!coinFromList) {
            onSelectCoinMsg(true);
        } else {
            const totalPrice = Number(values.price) * Number(values.amount);
            try {
                const res = await fetch('http://localhost:3000/transaction', {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                        jwt: "" + loginCtx.token,
                    },
                    body: JSON.stringify({
                        ...values,
                        totalPrice,
                    })
                });
                transactionsCtx?.refreshTransactions();
                portfolioCtx.refreshPortfolio();
                viewTransactions();
            } catch (error) {
                console.log(error)
            }
        }
    };

    return <>
        <Formik
            initialValues={initialValues}
            validationSchema={TransactionValidationSchema}
            onSubmit={onSubmit}
        >
            {({
                  setFieldValue,
                  values,
                  isValid,
                  isSubmitting,
              }) => (
                <Form className={styles.addTransaction__form}>
                    <FormikControl
                        control="select"
                        name="transactionType"
                        type=""
                        label="TRANSACTION"
                        value="buy"
                    />
                    <div className={styles.transaction__searchCoin}>
                        <label className={styles.transaction__searchCoin__title}>
                            COIN
                        </label>
                        <div className={styles.transaction__searchCoin__inputWrapper}>
                            <Field
                                className={styles.transaction__searchCoin__input}
                                type="text"
                                placeholder="Search"
                                name="coinName"
                            />
                            <button className={styles.transaction__searchCoin__refreshButton} onClick={event => {
                                setFieldValue('coinId', '');
                                setFieldValue('coinName', '');
                                onLoadList();
                                setCoinFromList(prevState => false)
                                onSelectCoinMsg(false);
                            }}>
                                <span className="material-symbols-outlined">
                                refresh
                                </span>
                            </button>
                        </div>
                        <ErrorMessage name="coinName">
                            {errorMsg}
                        </ErrorMessage>
                    </div>
                    {values.coinName && coinList.some(coin => coin.name !== values.coinName) &&
                        <div className={styles.transaction__searchCoin__coinListWrapper}>
                            <ul className={styles.transaction__searchCoin__ul}>
                                {handleSearch(values.coinName).map(coin =>
                                    <li onClick={prevValue => {
                                        setFieldValue('coinId', coin.id);
                                        setFieldValue('coinName', coin.name);
                                        onSetCoinList();
                                        setCoinFromList(prevState => true);
                                    }}
                                        key={coin.id}
                                    >
                                        <div className={styles.transaction__searchCoin__coinListItem}>
                                            <img className={styles.transaction__coinListItem__image} src={coin.image}
                                                 alt=""/>
                                            <div className={styles.transaction__coinListItem__details}>
                                            <span className={styles.transaction__coinListItem__name}>{coin.name}
                                            </span>
                                                <span className={styles.transaction__coinListItem__symbol}>{coin.symbol}
                                            </span>
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
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
                                ? styles.button__loading : ""} ${!isValid ? styles.button__disabled : ""} ${!coinFromList ? styles.button__disabled : ""}`}
                            onClick={undefined}
                        >
                            SAVE
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    </>
};


