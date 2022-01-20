import React from 'react';
import CommentForm from '@/pages/Common/CommentForm';
import CommentList from '@/pages/Common/CommentList';

import { actions as commentActions } from '@/redux/reducers/comment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import {
    Icon, message

} from 'antd';
import styles from './index.less';
import { decodeUrlParam } from '@/utils/crypt';



const mapStateToProps = (state) => {
    return {
        commentList: state.myComment.data.list,
        pagination: state.myComment.data.pagination,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            postComment: (payload, callback) => commentActions.postComment(payload, callback),
            fetchCommentList: (payload, callback) => commentActions.fetchCommentList(payload, callback),
        }, dispatch)
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class Comment extends React.Component {

    state = {
        parentCommentId: undefined,
        parentCommentNickname: undefined,
    }

    componentDidMount() {
        const { fetchCommentList, pagination } = this.props;
        const id = this.parseIdFromParams();
        if (id) {
            fetchCommentList({ id, page: pagination.current })
        }
        // console.log(this.props);
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

        const { fetchCommentList, postComment, pagination } = this.props;
        const { parentCommentId, parentCommentNickname } = this.state;
        const id = this.parseIdFromParams();
        const postData = { ...formValues }
        if (id) {
            postData.articleId = id;
        }


        if (parentCommentId !== undefined) {
            postData.parentCommentId = parentCommentId;
        }

        if (parentCommentNickname !== undefined) {
            postData.parentCommentNickname = parentCommentNickname
        }

        console.log(postData)

        postComment(postData, () => {
            fetchCommentList({ id, page: pagination.current, })
            if (this.state.parentCommentId !== undefined) {
                const ele = document.getElementById("test");
                // ele.scrollIntoView();
                const y = ele.getBoundingClientRect().top + window.scrollY;
                window.scroll({
                    top: y,
                    behavior: 'smooth'
                });
            }
            this.setState({
                parentCommentId: undefined,
                parentCommentNickname: undefined
            })
            message.success("Thanks for your comment.")



            if (callback) callback();
        });

    }

    replyHandler = (parentCommentId, parentCommentNickname) => {
        console.log(parentCommentId, parentCommentNickname)
        this.setState({
            // hideForm: hideCommentForm
            parentCommentId,
            parentCommentNickname
        })
    }


    pageChangeHandler = (page) => {
        // console.log(page);
        const { fetchCommentList, pagination } = this.props;
        const id = this.parseIdFromParams();
        if (id) {
            fetchCommentList({ id, page, })
        }
    }

    render() {

        const { commentList, pagination } = this.props;

        const paginationProps = {
            ...pagination,
            onChange: this.pageChangeHandler
        }

        return (
            <div>
                <div className={styles.heading} id="test">
                    <Icon type="message"></Icon> Comments
                </div>
                <div className={styles.listContainer}>
                    <CommentList data={commentList}
                        parentCommentId={this.state.parentCommentId}
                        replyHandler={this.replyHandler}
                        submitHandler={this.submitHandler}
                        paginationProps={paginationProps}
                        replyName={this.state.parentCommentNickname}

                    ></CommentList>
                </div>

                {this.state.parentCommentId === undefined &&
                    <div>
                        <CommentForm submitHandler={this.submitHandler}></CommentForm>
                    </div>
                }

            </div>
        )
    }
}


export default withRouter(Comment);