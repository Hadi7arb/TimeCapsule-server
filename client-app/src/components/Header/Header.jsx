import React from "react";
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}> 
            <h1 className={styles.h1}>MomentoFrame</h1>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <a href="#" className={styles.a}>Sign-up</a>
                    </li>
                    <li className={styles.li}>
                        <button className={styles.button}>Sign-in</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
