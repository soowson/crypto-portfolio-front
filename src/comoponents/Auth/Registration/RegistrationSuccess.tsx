import React from "react";
import {Banner} from "../../common/Banner/Banner";
import {useNavigate} from "react-router-dom";
import {Button} from "../../common/Button/Button";

import styles from "./RegistrationSuccess.module.css";

export const RegistrationSuccess = () => {
    const navigate = useNavigate();

    const loginNavigate = () => {
        return navigate("/auth/login")
    };

    return <>
        <div className={styles.registrationSuccessPage}>
            <Banner>
                <div>
                    <p className={styles.banner__row}>Logg in to</p>
                    <p className={styles.banner__row}>Create Your</p>
                    <p className={styles.banner__row}>Crypto Portfolio</p>
                </div>
            </Banner>
            <Button
                type="button"
                className={styles.login__button}
                onClick={loginNavigate}
            >
                LOGIN
            </Button>
        </div>
    </>
};
