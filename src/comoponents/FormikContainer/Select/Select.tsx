import React from "react";
import {Field} from "formik";

import styles from "./Select.module.css";

interface Props {
    label: string;
    name: string;
    value: string | undefined;
}

export const Select = ({label, name, value, ...rest}: Props) => {
    return (
        <div className={styles.form__details}>
            <label className={styles.form__details__title}>{label}</label>
            <Field as="select" className={styles.form__details__select} name={name}  {...rest}>
                <option value={value}>{value}</option>
            </Field>
        </div>
    )
};
