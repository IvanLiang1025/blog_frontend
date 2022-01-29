import React from "react";
import { List, Row, Col, Avatar, Icon, Spin,Tag } from 'antd';
import styles from './index.less';
import { dateStringToTime } from "@/utils/dateUtils";
import { withRouter } from "react-router-dom";
import { encodeUrlParam } from "@/utils/crypt";

import { actions } from "@/redux/reducers/blog";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import SpinIndicator from "@/Components/SpinIndicator";
import { getBlogTypeLabel } from "@/services/options";
import { fetchHomeBlog } from "@/redux/sagas/blog";

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

    state = {
        categoryId: undefined
    }

    static getDerivedStateFromProps (nextPros, preState) {
        const {pagination, fetchHomeBlogList} = nextPros;
        
        if(nextPros.categoryId && nextPros.categoryId !== preState.categoryId){
            const postData = {
                page: 1,
                limit: pagination.pageSize,
                categoryId: nextPros.categoryId
            }

            fetchHomeBlogList(postData)

            return {
                categoryId: nextPros.categoryId
            }
        }

        return null
    }

    componentDidMount() {
        const { fetchHomeBlogList, pagination, forCategory } = this.props;
        
        /** fetch blog list not based on categoryId */
        if(!forCategory){
            const postData = {
                page: 1, 
                limit: pagination.pageSize,
            }
            fetchHomeBlogList(postData)
        }
    }


    handleBlogDetail = (id) => {
        this.props.history.push({
            pathname: `/blog/detail/${encodeUrlParam(id)}`,
            
        })
    }


    renderBlogItem = (data) => {

        const {blogList} = this.props;

        const index = blogList.findIndex((ele) => ele.articleId === data.articleId);
        let even;
        if(index !== -1) {
            even = index % 2 === 0;
        }

        return (
            <div className={`${styles.listItemContainer} ${styles.aniTranslate}`} onClick={() => this.handleBlogDetail(data.articleId)}>
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

                                {/* <Avatar src={data.userInfo.avatar}></Avatar> */}
                                <Icon type="user"></Icon>
                                &nbsp;<span>{data.userInfo.nickName}</span>
                            </span>
                            <span className={styles.infoItem}>
                                <Icon type="calendar" ></Icon>
                                &nbsp;{dateStringToTime(data.createDate)}

                            </span>
                            <span className={styles.infoItem}>
                                <Icon type="eye"></Icon>
                                &nbsp;{data.viewCount}
                            </span>
                            <span ><Tag color="#87d068">{getBlogTypeLabel(data.type)}</Tag> </span>
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
        const { fetchHomeBlogList, pagination, categoryId} = this.props;
        const postData = {
            page,
            limit: pagination.pageSize,
            total: pagination.total,
        }

        if(categoryId){
            postData.categoryId = categoryId
        }

        fetchHomeBlogList(postData)

    }

    render() {

        const { blogList, pagination, loading } = this.props;

        const paginationProps = {
            ...pagination,
            onChange: this.handlePageChange
        }


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