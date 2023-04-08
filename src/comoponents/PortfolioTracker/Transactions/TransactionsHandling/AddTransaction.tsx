import React, {Fragment, useCallback, useEffect, useState} from "react";
import {CoinReq} from "types";
import {Spinner} from "../../../common/Spinner/Spinner"
import {Card} from "../../../common/Card/Card";
import {FormikAddTransaction} from "../../../FormikContainer/FormikTransaction/FormikAddTransaction";

import styles from "./TransactionHandling.module.css";

export const AddTransaction = () => {
    const [coinList, setCoinList] = useState<CoinReq[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectCoinFromListMsg, setSelectCoinFromListMsg] = useState<boolean>(false);

    const selectCoinMsg = (value: boolean) => {
        setSelectCoinFromListMsg(prevState => value);
    };

    const loadList = useCallback((async () => {
        setLoading(true)
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false&price_change_percentage=1h%2C24h%2C7d`);
        const data = await res.json();
        setCoinList(data)
        setLoading(false)
    }), []);

    const setCoinListHandler = () => {
        setCoinList([]);
    };

    useEffect(() => {
        setLoading(true)
        try {
            loadList();
        } catch (error) {
            console.log(error)
        }
    }, [loadList]);


    return <Card>
        {
            loading ? <Spinner/> :
                <Fragment>
                    <div className={styles.transaction__title}>ADD TRANSACTION</div>
                    {selectCoinFromListMsg &&
                        <p className={styles.transaction__selectCoinMsg}>Select coin from the list!</p>}
                    <FormikAddTransaction
                        coinList={coinList}
                        onLoadList={loadList}
                        onSetCoinList={setCoinListHandler}
                        onSelectCoinMsg={selectCoinMsg}
                    />
                </Fragment>
        }
    </Card>
};
