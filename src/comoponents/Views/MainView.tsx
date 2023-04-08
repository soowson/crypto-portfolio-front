import React from 'react';
import {Banner} from "../common/Banner/Banner"
import {CoinTable} from "../CoinList/CoinTable";

import styles from './MainView.module.css';

export const MainView = () => {
    return <>
        <Banner>
            <div>
                <p className={styles.banner__row}>Create Your</p>
                <p className={styles.banner__row}>Crypto Portfolio</p>
            </div>
        </Banner>
        <CoinTable/>
    </>
};
