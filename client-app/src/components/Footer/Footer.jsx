import React from 'react';
import styles from './Footer.module.css';
import facebookIcon from '../../assets/facebook.svg';
import twitterIcon from '../../assets/twitter.svg';
import instagramIcon from '../../assets/instagram.svg';
import youtubeIcon from '../../assets/youtube.svg';


const Footer = () => {

    return (
        <footer className={styles.footer}>
            <div className={styles.div1}>
               <h4 className={styles.h4}>"The future reads what the present writes."</h4>
               <h5 className={styles.h5}>Start your capsule or view stories shared by others.</h5> 
            </div>

            <div className={styles.div2}>
                <a href="#" className={styles.as}>
                    <img src={facebookIcon} alt="Facebook" />
                </a>
                <a href="#" className={styles.a}>
                    <img src={twitterIcon} alt="Twitter" />
                </a>
                <a href="#" className={styles.a}>
                    <img src={instagramIcon} alt="Instagram" />
                </a>
                <a href="#" className={styles.a}>
                    <img src={youtubeIcon} alt="youtube" />
                </a>
            </div>
            
        </footer>
    );


}

export default Footer;