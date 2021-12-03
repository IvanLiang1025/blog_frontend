import React from 'react';
import styles from './index.less';


const SpinIndicator = (props) => {

    const { message } = props

    return (
        <div className={styles.spinContainer}>
            <div>
                <div className={styles.spinner}>
                    <div className={styles.rect1}></div>
                    <div className={styles.rect2}></div>
                    <div className={styles.rect3}></div>
                    <div className={styles.rect4}></div>
                    <div className={styles.rect5}></div>
                </div>
                {message &&
                    <div>
                        {message}
                    </div>
                }
            </div>
        </div>
    )
}

export default SpinIndicator;