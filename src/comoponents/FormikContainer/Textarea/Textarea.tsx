import React from "react";
import {ErrorMessage, Field} from "formik";
import {errorMsg} from "../../TextError/TextError";

import styles from "./Textarea.module.css";

interface Props {
    label: string;
    name: string;
    type: string;
    placeholder: string | undefined;
}

export const Textarea = ({label, name, placeholder}: Props) => {
    return (
        <div className={styles.form__notesWrapper}>
            <label className={styles.form__notes__title}>{label}</label>
            <Field as="textarea" className={styles.form__notes__input} name={name} label={label} placeholder={placeholder}/>
            <ErrorMessage name={name}>
                {errorMsg}
            </ErrorMessage>
        </div>
    )
};
