import React, {useContext} from "react";
import {GetPortfolioReq} from "types"
import {numberApproximation, numberLook, amountLook} from "../../utils/helperFunctions";
import {CoinListContext} from "../../utils/context/CoinListContext/CoinListContext";

import styles from "./Portfolio.module.css";

interface Props {
    portfolio: GetPortfolioReq;
}

export const PortfolioTableRow = ({portfolio}: Props) => {
    const coinCtx = useContext(CoinListContext);

    const coinImage = coinCtx.filter(coin => coin.id === portfolio.coinId).map(element => element.image);
    const currentPrice = coinCtx.filter(coin => coin.id === portfolio.coinId).map(element => element.current_price);
    const currentValue = Number(currentPrice) * Number(portfolio.overallAmount);
    const profit = Number(currentValue) - Number(portfolio.overallPrice);
    const profitPercentage = Number((((profit) / Number(portfolio.overallPrice)) * 100).toFixed(2));


    return <tr className={styles.portfolioTable__tbodyTr}>
        <td className={styles.portfolioTable__tbodyTd__first}><img className={styles.portfolioTable__coinImage} src={coinImage[0]} alt={portfolio.coinId}/></td>
        <td className={styles.portfolioTable__tbodyTd__second}>{portfolio.coinName}</td>
        <td>{amountLook(portfolio.overallAmount)}</td>
        <td className={styles.portfolioTable__tbodyTd__fourth}>{`$${numberApproximation(Number(currentPrice))}`}</td>
        <td className={styles.portfolioTable__tbodyTd__fifth}>{`$${numberApproximation(currentValue)}`}</td>
        <td style={{color: numberLook(Number(profit))}}>
            <div>
                <p>{`$${numberApproximation(Number(profit))}`}</p>
                <p>{`${numberApproximation(profitPercentage)}%`}</p>
            </div>
        </td>
    </tr>
};

