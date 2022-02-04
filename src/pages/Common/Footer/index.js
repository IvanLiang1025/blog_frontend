import React from 'react';
import styles from "./index.less";


const Footer = (props) => {

    const year = new Date().getFullYear();

    return (
        <div className={styles.footerContainer}>
            <div>
                Copyright &copy; {year} <a href="/home">Ivan's blog</a>. All Rights Reserved.
                <div>
                {/* <a href='https://www.freepik.com/vectors/tree'>Tree vector created by catalyststuff - www.freepik.com</a> */}
                </div>
            </div>
        </div>
    )
}

export default Footer;