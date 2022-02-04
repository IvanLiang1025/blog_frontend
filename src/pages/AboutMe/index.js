import React from 'react';
import styles from './index.less';

import { Row, Col } from 'antd';
import BugImg from "@/assets/running.gif";
import QuoteLeft from "@/assets/quote-left.svg";

import QuoteRight from "@/assets/quote-right.svg";
import HobbyBook from './HobbyBook';





class AboutMe extends React.Component {

    render() {

        return (
            <div className={styles.bgContainer}>
                <Row>
                    <Col sm={{ offset: 2, span: 20 }} lg={{ offest: 3, span: 18 }}>
                        <div className={`${styles.segment} ${styles.aniEase}`}>
                            <div className={styles.bugImgContainer}>
                                <img className={styles.bugImg} src={BugImg}></img>
                            </div>

                            <div className={styles.selfInfo}>
                                <img width={15} src={QuoteLeft}></img>
                                <p style={{marginTop: 10}}>
                                    I am a nobody who just want to leave my footprint in this world.
                                </p>

                                <p>
                                    As the saying goes "where there is a will, there is a way".

                                </p>
                                <p style={{marginBottom: 5}}>
                                    I am dedicated to become a full-stack engineer. Nothing can stop me from becoming a better one.
                                </p>
                                <div style={{ textAlign: "right" }}><img src={QuoteRight} width={15}></img></div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col sm={{ offset: 2, span: 20 }} lg={{ offest: 3, span: 18 }}>

                        <div style={{margin: "25px 0px"}}> 
                        <HobbyBook></HobbyBook>
                        </div>
                    
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AboutMe;