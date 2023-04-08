import React from "react";

import styles from './Banner.module.css';

interface Props {
    children: JSX.Element;
}

export const Banner = ({children}: Props) => {
    return <section className={styles.banner}>
        {children}
        <p className={styles.banner_row}>...and admire your <span className={styles.banner__span}>profit</span></p>
    </section>
};
