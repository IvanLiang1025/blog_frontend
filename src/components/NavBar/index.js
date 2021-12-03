import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'antd';
import styles from "./index.less";



const NavBar = () => {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click)


        // const {click} = this.state;
        return(
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    Ivan's Blog
                </div>
                <ul className={click ? `${styles.navMenu} ${styles.navMenuResponsive}` : styles.navMenu}>
                    <li><Icon type="home" className={styles.menuIcon}></Icon><a href="/home">Home</a></li>
                    <li><Icon type="folder-open" className={styles.menuIcon}></Icon><a href="/category">Category</a></li>
                    <li><Icon type="calendar" className={styles.menuIcon}></Icon><a href="/archive">Timeline</a></li>
                    <li><Icon type="user" className={styles.menuIcon}></Icon><a href="/about">About Me</a></li>
                    
                </ul>
                <Icon type="menu" className={styles.toggleIcon} onClick={handleClick}></Icon>
            </div>
        )

    // return(
    //     <div className = { styles.navContainer } >
    //         <div className={styles.logo}>
    //             ddd
    //         </div>
    //         <ul className={click ? `${styles.navMenu} ${styles.navMenuResponsive}` : styles.navMenu}>
    //             <li><Icon type="home" className={styles.menuIcon}></Icon><a href="/home">login</a></li>
    //             <li><Icon type="folder-open" className={styles.menuIcon}></Icon><a href="/category">Category</a></li>
    //         </ul>
    //         <Icon type="menu" className={styles.toggleIcon} onClick={handleClick}></Icon>
    //     </div>
    // )
}

export default NavBar;
