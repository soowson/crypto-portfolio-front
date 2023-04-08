import React, {useState, Fragment} from "react";
import {Link} from "react-router-dom";
import {FormikRegistration} from "../../FormikContainer/FormikAuth/FormikRegistration";
import {Card} from "../../common/Card/Card";

import styles from '../Auth.module.css';

export const RegistrationForm = () => {
    const [usedEmail, setUsedEmail] = useState<boolean>(false);

    const usedEmailHandler = (value: boolean) => {
        setUsedEmail(prevState => value)
    };

    return <Card>
        <Fragment>
            <div className={styles.auth__title}>CREATE ACCOUNT</div>
            {usedEmail ?
                <p className={styles.registration__responseMsg}>An account with the email address you entered already
                    exists.</p> : null}
            <FormikRegistration usedEmailHandler={usedEmailHandler}/>

            <div className={styles.login__linkWrapper}>
                Already have an account?
                <Link to="/auth/login" className={styles.login__link}>LOGIN</Link>
            </div>
        </Fragment>
    </Card>
};





