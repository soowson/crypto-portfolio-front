import React from 'react';

import styles from './Button.module.css';

interface Props {
    type: "button" | "submit";
    className: string;
    children: string;
    onClick: undefined | (() => void) | ((event: React.MouseEvent<Element, MouseEvent>) => Promise<void>);
}

export const Button = (props: Props) => {
    return (
        <button
            type={props.type || 'button'}
            className={`${styles.button} ${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};
