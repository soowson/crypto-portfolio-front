import React from 'react';
import {PortfolioTable} from "../PortfolioTracker/Portfolio/PortfolioTable";
import {Navigation} from "../common/Navigation/Navigation";
import {PortfolioValues} from "../PortfolioTracker/Portfolio/PortfolioValues";

import styles from "../PortfolioTracker/Portfolio/Portfolio.module.css";

export const PortfolioView = () => {

    return <div className={styles.portfolioPage}>
        <PortfolioValues/>
        <Navigation/>
        <section className={styles.portfolioTableSection}>
            <PortfolioTable/>
        </section>
    </div>
};


