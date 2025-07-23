import React from "react";
import styles from './Header2.module.css';
import menuIcon from '../../assets/menu.svg';

const Header2 = () => {
    return (
            <header className={styles.header}>
                <img src={menuIcon} alt="Menu" className={styles.img} />
                <h1 className={styles.h1}>MomentoFrame</h1>
                
            </header>

    );
}

export default Header2;