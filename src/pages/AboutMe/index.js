import React from 'react';
import styles from './index.less';

import {Row, Col} from 'antd';


class AboutMe extends React.Component{

    render(){

        return(
            <div className={styles.bgContainer}>
                <Row>
                    <Col sm={{ offset: 2, span: 20 }} lg={{ offest: 3, span: 18 }}>
                        <div className={styles.segment}>
                            hsdf
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AboutMe;