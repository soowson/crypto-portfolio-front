import React, {useCallback, useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {LoginContext} from "../utils/context/LoginContext/LoginContext";

import styles from './Header.module.css';


type logoutResponseMsg = {
    ok: boolean;
};

export const Header = () => {
    const [toggle, setToggle] = useState(false);
    const loginCtx = useContext(LoginContext);
    const navigate = useNavigate();

    const toggleButtonHandler = () => {
        setToggle(prevState => !prevState)
    };

    const navigationMobileInactive = () => {
        setToggle(prevState => false)
    }

    const logoutHandler = useCallback(() => {
        try {
            (async () => {
                const res = await fetch('http://localhost:3000/auth/logout', {
                    headers: {
                        'Content-Type': 'application/json',
                        jwt: "" + loginCtx.token,
                    },
                    credentials: 'include',
                })
                const data = await res.json() as logoutResponseMsg;
                navigationMobileInactive();
                if (data.ok) {
                    localStorage.removeItem('token')
                    navigate("/")
                }
            })();
        } catch (error) {
            console.log(error)
        }
    }, [loginCtx.token])


    return <header className={styles.header}>
        <Link to="#" className={styles.header__toggleButton} onClick={toggleButtonHandler}>
            <span className={styles.header__toggleButton__bar}></span>
            <span className={styles.header__toggleButton__bar}></span>
            <span className={styles.header__toggleButton__bar}></span>
        </Link>
        <div
            className={`${styles.header__mainWrapper} ${toggle ? styles.header__mainWrapper__navigationMobileActive : ""}`}>
            <Link to="/" className={styles.header__main} onClick={navigationMobileInactive}>
                CRYPTO
            </Link>
        </div>
        <nav className={`${styles.navigation} ${toggle ? styles.navigationMobileActive : ""}`}>
            <Link to={`portfolio`} className={styles.navigation__portfolioTracker} onClick={navigationMobileInactive}>
                Portfolio Tracker
            </Link>
            {
                loginCtx.token ?
                <Link to="" className={styles.navigation__login} onClick={logoutHandler}>Logout</Link> :
                <Link to="/auth/login" className={styles.navigation__login}
                      onClick={navigationMobileInactive}>
                    Login
                </Link>
            }
            {
                loginCtx.token ?
                null :
                <Link to="/user/registration" className={styles.navigation__registration} onClick={navigationMobileInactive}>
                    Get Started
                </Link>
            }
        </nav>
    </header>
};
