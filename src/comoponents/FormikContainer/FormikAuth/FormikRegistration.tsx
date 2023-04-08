import React from "react";
import {Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import * as yup from 'yup';
import {Button} from "../../common/Button/Button"
import {FormikControl} from "../FormikControl";
import {RegistrationForm} from "types";

import styles from '../../Auth/Auth.module.css';

const initialValues: RegistrationForm = {
    email: '',
    pwd: '',
    pwdConfirm: '',
};

const validationSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Required').max(320, 'Email is too long - should be 320 chars maximum'),
    pwd: yup.string().required('Required').min(8, 'Password is too short - should be 8 chars minimum').max(255, 'Password is too long - should be 255 chars maximum'),
    pwdConfirm: yup.string().oneOf([yup.ref('pwd'), ''], 'Passwords must match').required('Required')
});

interface Props {
    usedEmailHandler: (value: boolean) => void;
}

export const FormikRegistration = ({usedEmailHandler}: Props) => {
    const navigate = useNavigate();

    const onSubmit = async (values: RegistrationForm) => {
        try {
            const res = await fetch('http://localhost:3000/user/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: values.email,
                    pwd: values.pwd,
                }),
            });
            const data = await res.json();

            if (data.message === 'An account with the email address you entered already exists.') {
                usedEmailHandler(true);
            } else if (data.message === 'Your account has been created!') {
                return navigate('/user/registration/success');
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
              }) =>
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
                    <FormikControl
                        control="input"
                        name="pwdConfirm"
                        type="password"
                        label="CONFIRM PASSWORD"
                    />
                    <div className={styles.auth__buttonWrapper}>
                        <Button type="submit"
                                className={`${styles.registration__button} ${isSubmitting ? styles.button__loading : ""} ${!isValid ? styles.button__disabled : ""}`}
                                onClick={undefined}>
                            CREATE ACCOUNT
                        </Button>
                    </div>
                </Form>
            }
        </Formik>
    </>
};
