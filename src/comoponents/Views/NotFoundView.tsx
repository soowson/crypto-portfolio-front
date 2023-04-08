import React from "react";
import styles from './NotFoundview.module.css'
import {Button} from "../common/Button/Button";
import {useNavigate} from "react-router-dom";

export const NotFoundView = () => {
    const navigate = useNavigate();
    const loginNavigate = () => {
        return navigate("/")
    };
    return <section className={styles.notFoundView}>
        <h1 className={styles.error}>404</h1>
        <h2>Ooops...page not found</h2>
        <Button
            type="button"
            className={styles.home__button}
            onClick={loginNavigate}
        >
            GO HOME
        </Button>
    </section>

}
