import React from 'react';
import ErrorImg from "@/assets/404.svg";
import styles from './index.less';

const NotFound = (props) => {

    return (
        <div className={styles.container}>

            <div>
                <img className={styles.img} src={ErrorImg}></img>

                <div>
                    <div style={{textAlign: "center"}}><a style={{ fontSize: 8, color: '#aeaeac' }} href="https://storyset.com/web">Web illustrations by Storyset</a></div>
                    <div>
                        <h2>Sorry, the page is not found.</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;