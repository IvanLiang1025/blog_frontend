

import React from 'react';
import {
    Timeline,
    Row,
    Col,
    Pagination,
    Spin,
} from "antd";

import styles from './index.less';
import { connect } from 'react-redux';
import {
    actions
} from "@/redux/reducers/blog";
import { bindActionCreators } from "redux";
import { date2YMD } from '@/utils/dateUtils';
import { Fragment } from 'react';
import NavBar from '@/Components/NavBar';

import LoadingHOC from "@/Components/LoadingHOC";
// import AnimationLoader from '@/Components/AnimationLoader';
import SpinIndicator from '@/Components/SpinIndicator';
import { encodeUrlParam } from '@/utils/crypt';



const mapStateToProps = (state) => {
    return {
        blogList: state.myBlog.data.list,
        pagination: state.myBlog.data.pagination,
        loading: state.myBlog.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            fetchHomeBlogList: (payload) => actions.fetchHomeBlogList(payload)
        }, dispatch)
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class Archive extends React.Component {

    state = {
        modeRight: false,
    }


    componentDidMount() {
        const { fetchHomeBlogList, pagination } = this.props;
        window.addEventListener("resize", this.onWindowResize);
        
        fetchHomeBlogList({ page: 1, limit: pagination.pageSize });
        
        // fetchHomeBlogList()
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onWindowResize)
    }

    onWindowResize = () => {

        const { modeRight } = this.state;
        if (modeRight && window.innerWidth > 992) {
            this.setState({ modeRight: false });
        }

        if (!modeRight && window.innerWidth <= 992) {
            this.setState({ modeRight: true })
        }

    }

    renderItem = (data, index) => {

        const isEven = ((index + 1) % 2 === 0);
        const { modeRight } = this.state;
        let classItemContainer = styles.itemContainer;

        if (!modeRight) {
            if (isEven) {
                classItemContainer = classItemContainer + " " + styles.even + " " + styles.aniLeftToRight;
            }else{

                classItemContainer = classItemContainer + " " + styles.aniRightToLeft;
            }
        }


        return (
            <div className={`${classItemContainer}`} onClick={() =>this.gotoDetail(data.articleId)}>
                <div className={styles.timeContainer}>{date2YMD(data.createDate)}</div>
                <div className={styles.titleContainer}>
                    {data.title}
                </div>
            </div>
        )
    }

    gotoDetail = (articleId) => {
        this.props.history.push({
            pathname: `/blog/detail/${encodeUrlParam(articleId)}`
        })
    }

    handlePageChange = (page) => {
        const { fetchHomeBlogList, pagination } = this.props;

        fetchHomeBlogList({ page, limit: pagination.pageSize })
    }

    render() {
        const { blogList, pagination } = this.props;
        const paginationProps = {
            ...pagination,
            onChange: this.handlePageChange
            // total: 
        }

        return (
            <Fragment>
                <div className={styles.bgContainer}>
                    <Row>
                        <Col sm={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }}>
                            <div className={styles.segment}>
                                <Timeline mode={this.state.modeRight ? "left" : "alternate"}>
                                    {blogList && blogList.map((item, index) => {
                                        return (
                                            <Timeline.Item>{this.renderItem(item, index)}</Timeline.Item>
                                        )
                                    })}
                                </Timeline>
                            </div>
                            <div className={styles.pageContainer}>
                                <div>
                                    <Pagination
                                        {...paginationProps}
                                    ></Pagination>
                                </div>
                            </div>

                        </Col>
                    </Row>

                </div>

            </Fragment>
        )
    }
}


export default Archive;