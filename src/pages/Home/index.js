import React, { Fragment } from "react";

import NavBar from "@/Components/NavBar";
import HomeLayout from "../Layout/HomeLayout";
import { Row, Col, Card } from 'antd';
import styles from "./index.less";

import BlogListView from "../Common/BlogListView";
import CategoryCard from "./CategoryCard";
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import HotArticleCard from "./HotArticleCard";




class Home extends React.Component {

    render() {
        const {categoryList,} = this.props;
        return (
            <Fragment>
                <Row className={styles.contentRow}>
                    <Col lg={{ offset: 2, span: 14 }} sm={24}>
                        <div style={{ padding: "10px 20px" }}>
                            <BlogListView />
                        </div>
                        
                    </Col>
                    <Col lg={{ span: 6 }} sm={24}>
                        <div style={{padding: "10px 20px"}}>
                            <CategoryCard history={this.props.history}></CategoryCard>
                        </div>
                        <div style={{padding: "10px 20px"}}>
                            <HotArticleCard history={this.props.history}></HotArticleCard>
                        </div>
                    </Col>
                </Row>
            </Fragment>
            // <div>hehe</div>
        )
    }
}

export default Home;