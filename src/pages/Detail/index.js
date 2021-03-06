import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { decodeQuery, decodeUrlParam } from "@/utils/crypt";
import { actions as blogActions } from "@/redux/reducers/blog";
import { actions as commentActions } from '@/redux/reducers/comment';
import styles from "./index.less";
import { Row, Col, Skeleton, Avatar, Icon, Tag, Divider } from "antd";
import MarkdownViewer from "../Common/Markdown/MarkdownViewer";
import { Fragment } from "react";
import Comment from "@/pages/Common/Comment";
import Copyright from "../Common/Copyright";
import { dateStringToTime } from "@/utils/dateUtils";
import { getBlogTypeLabel } from "@/services/options";


const mapStateToProps = (state) => {
    return {
        blogDetail: state.myBlog.blogDetail,
        loading: state.myBlog.isLoading,
        commentList: state.myComment.data.list,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            fetchBlogDetail: (payload) => blogActions.fetchHomeBlog(payload),
            postComment: (payload, callback) => commentActions.postComment(payload, callback),
            fetchCommentList: (payload, callback) => commentActions.fetchCommentList(payload, callback),
        }, dispatch)
    }
}


@connect(mapStateToProps, mapDispatchToProps)
class BlogDetail extends React.Component {




    componentDidMount() {
        const { fetchBlogDetail, fetchCommentList } = this.props;
        const id = this.parseIdFromParams();
        // console.log(id);
        if (id) {
            fetchBlogDetail({ id });
            fetchCommentList({ id })
        }
    }

    parseIdFromParams = () => {
        const { match: { params } } = this.props;
        if (params) {
            const id = decodeUrlParam(params.id);
            return id;
        }
        return;
    }

    submitHandler = (formValues, callback) => {

        const { postComment } = this.props;


        const id = this.parseIdFromParams();
        if (id) {
            const postData = { ...formValues, articleId: id };
            postComment(postData);
            if (callback) callback()
        }
    }



    render() {
        // console.log(this.props);
        const { blogDetail, commentList } = this.props;
        const { title, description, content, userInfo, createDate, viewCount, type } = blogDetail || {}
        // console.log(description)

        return (
            <Fragment>
                <div className={styles.bgContainer}>
                    <Row>
                        <Col sm={{ offset: 2, span: 20 }} lg={{ offest: 3, span: 18 }}>
                            <div className={styles.segment}>
                                <Skeleton loading={this.props.loading}>
                                    <h1 className={styles.title}>{title}</h1>
                                    <div className={styles.infoContainer}>
                                        <span>
                                            <Tag color="#87d068">{getBlogTypeLabel(type)}</Tag>
                                        </span>
                                        <span className={styles.infoItem}>

                                            <Icon type="user"></Icon>
                                            &nbsp;<span className={styles.name} >{userInfo && userInfo.nickName}</span>
                                        </span>
                                        <span className={styles.infoItem}>
                                            <Icon type="calendar" ></Icon>
                                            &nbsp;{dateStringToTime(createDate)}

                                        </span>
                                        <span className={styles.infoItem}>
                                            <Icon type="eye"></Icon>
                                            &nbsp;{viewCount}
                                        </span>
                                        
                                    </div>
                                    <h2 className={styles.subTitle}>Description</h2>
                                    <p className={styles.description}>{description}</p>

                                    {blogDetail && blogDetail.content && <MarkdownViewer content={blogDetail.content}></MarkdownViewer>}

                                    {blogDetail && blogDetail.type === 1 && <Copyright author={userInfo && userInfo.nickName}></Copyright>}
                                    <Divider className={styles.divider}><span className={styles.endText}>End</span></Divider>

                                    <div style={{marginTop: 25}}>
                                        <Comment></Comment>
                                    </div>
                                </Skeleton>
                            </div>

                        </Col>
                    </Row>
                </div>
            </Fragment>
        )
    }
}

export default BlogDetail;