import React from "react";

import styles from "./TextError.module.css";

export const errorMsg = (errorMessage: string) => {
    return <div className={styles.formError}>{errorMessage}</div>
};
