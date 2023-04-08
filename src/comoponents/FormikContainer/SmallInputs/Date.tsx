import React from "react";
import {Field, ErrorMessage} from "formik";
import {errorMsg} from "../../TextError/TextError";
import moment from "moment";

import styles from "./SmallInputs.module.css";

interface Props {
    label: string;
    name: string;
    type: string;
    placeholder: string | undefined;
    value: string | undefined;
}

export const DateInput = ({label, name, placeholder, value, ...rest}: Props) => {
    return (
        <div className={styles.form__details}>
            <label className={styles.form_details__title}>{label}</label>
            <Field className={styles.form__details__smallInput} name={name} placeholder={placeholder} value={value}
                   max={moment().format("yyyy-MM-DD")}  {...rest}/>
            <ErrorMessage name={name}>
                {errorMsg}
            </ErrorMessage>
        </div>
    )

}
