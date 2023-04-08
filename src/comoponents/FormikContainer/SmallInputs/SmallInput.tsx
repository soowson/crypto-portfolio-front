import React from "react";
import {Field, ErrorMessage} from "formik";
import {errorMsg} from "../../TextError/TextError";

import styles from "./SmallInputs.module.css";

interface Props {
    label: string;
    name: string;
    type: string;
    placeholder: string | undefined;
    rest: any;
}

export const SmallInput = ({label, name, placeholder, type, ...rest}: Props) => {
    return (
        <div className={styles.form__details}>
            <label className={styles.form_details__title}>{label}</label>
            <Field className={styles.form__details__smallInput} name={name} placeholder={placeholder} type={type} min="0" step="any" rest={rest}
            />
            <ErrorMessage name={name}>
                {errorMsg}
            </ErrorMessage>
        </div>
    )
};
