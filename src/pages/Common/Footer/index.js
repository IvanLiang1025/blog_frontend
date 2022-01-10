import React from 'react';
import styles from "./index.less";


const Footer = (props) => {

    const year = new Date().getFullYear();

    return (
        <div className={styles.footerContainer}>
            <div>
                Copyright &copy; {year} <a href="/home">Ivan's blog</a>. All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer;