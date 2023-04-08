import React from "react";
import {CoinReq} from "types";
import {numberApproximation, numberLook, marketCapLook} from "../utils/helperFunctions";

import styles from "./CoinTable.module.css"

interface Props {
    coin: CoinReq
}

export const CoinTableRow = ({coin}: Props) => {

    return <tr className={styles.coinTable__tbodyTr}>
        <td className={styles.coinTable__tbodyTrTd__first}>{coin.market_cap_rank}</td>
        <td className={styles.coinTable__tbodyTrTd__second}><img className={styles.coinTable__image} src={coin.image} alt={coin.id}/></td>
        <td>{coin.name}</td>
        <td>$ {numberApproximation(coin.current_price)}</td>
        <td style={{color: numberLook(coin.price_change_percentage_1h_in_currency)}}>{coin.price_change_percentage_1h_in_currency.toFixed(2)} %</td>
        <td style={{color: numberLook(coin.price_change_percentage_24h_in_currency)}}>{coin.price_change_percentage_24h_in_currency.toFixed(2)} %</td>
        <td className={styles.coinTable__tbodyTrTd__sixth}>$ {marketCapLook(coin.market_cap)}</td>
    </tr>
};
