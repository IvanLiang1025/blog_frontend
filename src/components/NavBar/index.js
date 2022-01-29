import React, { useState, useEffect, Fragment } from 'react';
import { Menu, Icon } from 'antd';
import styles from "./index.less";



const NavBar = () => {

    const [click, setClick] = useState(false);

    const handleClick = () => {
    
        setClick(!click)
    }

    return (
       
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    Ivan's Blog
                </div>
                <div className={click ? `${styles.navMenu} ${styles.navMenuResponsive}` : styles.navMenu}>
                    <a className={styles.menuItem} href="/home"><Icon type="home" className={styles.menuIcon}></Icon> <span>Home</span></a>
                    <a className={styles.menuItem} href="/category"><Icon type="folder-open" className={styles.menuIcon}></Icon><span> Category</span></a>
                    <a className={styles.menuItem} href="/archive"><Icon type="calendar" className={styles.menuIcon}></Icon><span> Timeline</span></a>
                    <a className={styles.menuItem} href="/about"><Icon type="user" className={styles.menuIcon}></Icon><span> About</span></a>
                </div>
                <Icon type="menu" className={styles.toggleIcon} onClick={handleClick}></Icon>
            </div>

        // </div>
    )

    
}

export default NavBar;
