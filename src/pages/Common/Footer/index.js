import React from 'react';
import styles from "./index.less";


const Footer = (props) => {

    const year = new Date().getFullYear();

    return (
        <div className={styles.footerContainer}>
            <div>
                {/* <img src='https://www.animatedimages.org/data/media/345/animated-panda-image-0108.gif'></img> */}
                Copyright &copy; {year} <a href="/home">Ivan's blog</a>. All Rights Reserved.
                <div>
                {/* <a href='https://www.freepik.com/vectors/tree'>Tree vector created by catalyststuff - www.freepik.com</a> */}
                </div>
            </div>
        </div>
    )
}

export default Footer;