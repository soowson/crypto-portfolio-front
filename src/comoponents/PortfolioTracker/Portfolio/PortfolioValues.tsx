import React, {useContext} from "react";
import {numberApproximation, numberLook} from "../../utils/helperFunctions";
import {CoinListContext} from "../../utils/context/CoinListContext/CoinListContext";
import {PortfolioContext} from "../../utils/context/PortfolioContext/PortfolioContext";

import styles from "./Portfolio.module.css";

export const PortfolioValues = () => {
    const coinCtx = useContext(CoinListContext);
    const portfolioCtx = useContext(PortfolioContext);

    const investedMoney = portfolioCtx.portfolio.map(portfolio => portfolio.overallPrice).reduce(((acc: number, curr: number) => acc + curr), 0);
    const portfolioPrices = portfolioCtx.portfolio.map(portfolio => [portfolio.coinId, portfolio.overallPrice, portfolio.overallAmount]);
    const currentPrices = coinCtx.map(coin => [coin.id, coin.current_price]);

    let currentPortfolioPrices = [];
    for (let i = 0; i < currentPrices.length; i++) {
        let match = false;
        let element = 0;
        portfolioPrices.map((portfolio, index) => {
            if (portfolio[0] === currentPrices[i][0]) {
                match = true;
                element = index;
            }
        })
        if (match) {
            currentPortfolioPrices.push(Number(currentPrices[i][1]) * Number(portfolioPrices[element][2]))
        }
    }

    const sumCurrentPortfolioPrices = currentPortfolioPrices.reduce(((acc, curr) => acc + curr), 0);
    const profit = sumCurrentPortfolioPrices - investedMoney;
    const profitPercentage = Number((profit / investedMoney) * 100);
    const percentageValue = profit === 0 ? 0 : profitPercentage;

    return <section className={styles.portfolioState}>
        <p className={styles.portfolioState__value}>{`$${numberApproximation(sumCurrentPortfolioPrices)}`}</p>
        <div className={styles.portfolioState__profit}>
            <p className={styles.portfolioState__profit__item}
               style={{color: numberLook(Number(profit))}}>{`$${numberApproximation(profit)}`}</p>
            <p className={styles.portfolioState__profit__item}
               style={{color: numberLook(Number(profit))}}> {`${numberApproximation(percentageValue)}%`}</p>
        </div>
    </section>
};
