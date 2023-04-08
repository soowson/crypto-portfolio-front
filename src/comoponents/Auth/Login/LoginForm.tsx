import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {Card} from "../../common/Card/Card";
import {FormikLogin} from "../../FormikContainer/FormikAuth/FormikLogin";

import styles from '../Auth.module.css';

export const LoginForm = () => {
    const [responseMsg, setResponseMsg] = useState<string | null>(null);

    const responseMessageHandler = (value: string | null) => {
        setResponseMsg(prevState => value)
    };

    return <Card>
        <Fragment>
            <div className={styles.auth__title}>LOGIN</div>
            {responseMsg && <p className={styles.login__responseMsg}>{responseMsg}</p>}
            <FormikLogin responseMessageHandler={responseMessageHandler}/>
            <div className={styles.createAccount__linkWrapper}>
                Don't have an account?
                <Link to="/user/registration" className={styles.createAccount__link}>CREATE ACCOUNT</Link>
            </div>
        </Fragment>
    </Card>
};
