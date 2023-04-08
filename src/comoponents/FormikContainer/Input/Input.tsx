import React from "react";
import {Field, ErrorMessage} from "formik";
import {errorMsg} from "../../TextError/TextError";

import styles from "./Input.module.css";

interface Props {
    label: string;
    name: string;
    type: string;
    disabled: string | undefined;
    rest: any;
}

export const Input = ({label, name, disabled, ...rest}: Props) => {
    return (
        <div className={styles.form__details}>
            <label className={styles.form__details__title}>{label}</label>
            <Field className={styles.form__details__input} name={name} disabled={disabled} {...rest}/>
            <ErrorMessage name={name}>
                {errorMsg}
            </ErrorMessage>
        </div>
    )
};
