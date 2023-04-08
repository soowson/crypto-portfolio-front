import React from "react";

import styles from './Card.module.css';

export const Card = ({children}: { children: JSX.Element }) => {
    return <section className={styles.card}>
        {children}
    </section>
}
