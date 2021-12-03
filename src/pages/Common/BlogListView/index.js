import React from "react";
import { List, Row, Col, Avatar, Icon, Spin } from 'antd';
import styles from './index.less';
import { dateStringToTime } from "@/utils/dateUtils";
import { withRouter } from "react-router-dom";
import { encodeUrlParam } from "@/utils/crypt";

import { actions } from "@/redux/reducers/blog";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import SpinIndicator from "@/Components/SpinIndicator";

const mapStateToProps = (state) => {
    return {
        loading: state.myBlog.isLoading,
        blogList: state.myBlog.data.list,
        pagination: state.myBlog.data.pagination
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            fetchHomeBlogList: (payload) => actions.fetchHomeBlogList(payload)
        }, dispatch)
    }
}

Spin.setDefaultIndicator = SpinIndicator

@connect(mapStateToProps, mapDispatchToProps)
class BlogListView extends React.Component {

    componentDidMount() {
        const { fetchHomeBlogList, pagination } = this.props;
        fetchHomeBlogList({ page: 1, limit: pagination.pageSize })
    }


    handleBlogDetail = (id) => {
        this.props.history.push({
            pathname: `/blog/detail/${encodeUrlParam(id)}`,
            // query: encodeQuery({ id })
        })
    }


    renderBlogItem = (data) => {

        return (
            <div className={styles.listItemContainer} onClick={() => this.handleBlogDetail(data.articleId)}>
                <Row>
                    <Col sm={{ span: 24 }} lg={16}>
                        <div className={styles.title}>
                            {data.title}
                        </div>
                        <div className={styles.description}>
                            {data.description}
                        </div>
                        <div className={styles.infoContainer}>
                            <span className={styles.infoItem}>

                                <Avatar src={data.userInfo.avatar}></Avatar>
                                &nbsp;<span className={styles.name} >{data.userInfo.nickName}</span>
                            </span>
                            <span className={styles.infoItem}>
                                <Icon type="calendar" ></Icon>
                                &nbsp;{dateStringToTime(data.createDate)}

                            </span>
                            <span className={styles.infoItem}>
                                <Icon type="eye"></Icon>
                                &nbsp;{data.viewCount}
                            </span>
                        </div>
                    </Col>
                    <Col sm={{ span: 24 }} lg={{ offset: 2, span: 6 }}>
                        <div className={styles.imgContainer}>
                            <img className={styles.picture} src={data.userInfo.avatar}></img>
                        </div>

                    </Col>
                </Row>
            </div>
        )

    }

    handlePageChange = (page) => {
        const { fetchHomeBlogList, pagination } = this.props;
        fetchHomeBlogList({
            page,
            limit: pagination.pageSize,
            total: pagination.total,
        })

    }

    render() {

        const { blogList, pagination, loading } = this.props;

        const paginationProps = {
            ...pagination,
            onChange: this.handlePageChange
        }

        // console.log(this.props)

        return (
            <List
                dataSource={blogList}
                renderItem={item => this.renderBlogItem(item)}
                pagination={paginationProps}
                loading={loading}
            >

            </List>
        )
    }
}

export default withRouter(BlogListView);