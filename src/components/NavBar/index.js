import React, { useState, useEffect, Fragment } from 'react';
import { Menu, Icon } from 'antd';
import styles from "./index.less";



const NavBar = () => {

    const [click, setClick] = useState(false);

    const handleClick = () => {
        // console.log(click);
        setClick(!click)
    }

    // console.log(click)

    // const {click} = this.state;
    return (
        // <div style={{position: "relative"}}>
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    Ivan's Blog
                </div>
                {/* {
                    !click && (
                        <ul className={styles.navMenu}>
                            <li><Icon type="home" className={styles.menuIcon}></Icon><a href="/home">Home</a></li>
                            <li><Icon type="folder-open" className={styles.menuIcon}></Icon><a href="/category">Category</a></li>
                            <li><Icon type="calendar" className={styles.menuIcon}></Icon><a href="/archive">Timeline</a></li>
                            <li><Icon type="user" className={styles.menuIcon}></Icon><a href="/about">About Me</a></li>

                        </ul>
                    )
                } */}
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
