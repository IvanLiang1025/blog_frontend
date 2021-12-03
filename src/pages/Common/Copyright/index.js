import React from 'react';
import styles from './index.less';

import {
    Icon
} from 'antd';


const Copyright = (props) => {
    const {articleLink, author} = props; 
    return (
        <div className={styles.copyrightContainer}>
            <div className={styles.desContainer}>
                <Icon type="user"></Icon>
                <span className={styles.title}>Author: </span>{author}
            </div>
            <div className={styles.desContainer}>
                <Icon type="link"></Icon>
                <span className={styles.title}>Link: </span>
                <a >{articleLink}</a>
            </div>
            <div className={styles.desContainer}>
                <Icon type="share-alt"></Icon>
                <span className={styles.title}>Copyright notice:</span>
                &nbsp;All articles in this site, except for special statements, adopt the <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/"><u>CC BY-NC-SA 4.0</u></a> license agreement.

            </div>
           
        </div>
    )
}

export default Copyright;