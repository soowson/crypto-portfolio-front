import React from "react";
import {Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import * as yup from 'yup';
import {Button} from "../../common/Button/Button"
import {FormikControl} from "../FormikControl";
import {LoginForm} from "types";

import styles from '../../Auth/Auth.module.css';

const initialValues: LoginForm = {
    email: '',
    pwd: '',
};

const validationSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Required'),
    pwd: yup.string().required('Required'),
});

interface responseMsg {
    error: string;
    ok: boolean;
    message: string;
    token: string;
    email: string;
}

interface Props {
    responseMessageHandler: (value: string | null) => void;
}

export const FormikLogin = ({responseMessageHandler}: Props) => {
    const navigate = useNavigate();


    const onSubmit = async (values: LoginForm) => {
        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(values),
            });
            const data = await res.json() as responseMsg;

            if (data.ok) {
                const {token, email} = data;
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                return navigate(`/portfolio`)
            } else {
                responseMessageHandler(data.error)
            }
        } catch (error) {
            console.log(error)
        }
    };

    return <>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({
                  isSubmitting,
                  isValid,
              }) => (
                <Form className={styles.auth__form}>
                    <FormikControl
                        control="input"
                        name="email"
                        type="email"
                        label="EMAIL"
                    />
                    <FormikControl
                        control="input"
                        name="pwd"
                        type="password"
                        label="PASSWORD"
                    />
                    <div className={styles.auth__buttonWrapper}>
                        <Button
                            type="submit"
                            className={`${styles.login__button} ${isSubmitting ? styles.button__loading : ""} ${!isValid ? styles.button__disabled : ""}`}
                            onClick={undefined}
                        >
                            LOGIN
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    </>
};
