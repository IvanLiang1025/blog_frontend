import React from 'react';
import styles from "./index.less";
import SpinIndicator from '../SpinIndicator';

const AnimationLoader = (props) => {
    const {message} = props;
    return (
        <div className={styles.loaderContainer}>
            <SpinIndicator message={message}></SpinIndicator>
        </div>
    )
}

export default AnimationLoader;