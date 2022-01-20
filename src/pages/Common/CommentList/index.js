import React, { Fragment } from 'react';

import {
    Button,
    List,
    Icon,
    Avatar
} from "antd";
import { dateStringToTime } from "@/utils/dateUtils";
import styles from './index.less';
import CommentForm from '@/pages/Common/CommentForm';
import { fetchCommmentList } from '@/redux/sagas/comment';



class CommentList extends React.Component {


    renderReply = (replyComments) => {
        // console.log(replyComments)
        return (
            <div style={{marginTop: 10}}>
                {replyComments.map((item) => {
                    return this.renderSubComment(item)
                })}
            </div>
        )
    }

    renderSubComment = (comment) => {

        const { content, parentCommentId, parentCommentNickname, nickname, createDate, commentId } = comment;

        const avatar = comment.avatar ? comment.avatar : "https://res-blog-public.s3.ca-central-1.amazonaws.com/default_avatar.jpg"


        return (
            <div className={styles.subCommentContainer}>
                <div>
                    <Avatar size={35} src={avatar}></Avatar>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.head}>
                        <div>
                            <span className={styles.name}>{nickname}</span>
                            {parentCommentNickname && <span>&nbsp;&#9658; @{parentCommentNickname}</span>}

                            <span className={styles.time}>&nbsp;{dateStringToTime(createDate)}</span>
                        </div>
                    </div>
                    <div className={styles.content}>
                        {content}
                    </div>
                    <div>
                        <span className={styles.time}>{dateStringToTime(createDate)}</span>&nbsp;
                        {
                            this.props.parentCommentId === commentId ?
                                <span className={styles.iconContainer} onClick={this.cancelCommentHandler}>Cancel <Icon type="close-circle"></Icon></span>
                                : <span className={styles.iconContainer} onClick={() => this.handleReply(commentId, nickname)}>
                                    <Icon className={styles.icon} type="message"></Icon>Reply
                                </span>
                        }
                    </div>
                    {this.props.parentCommentId === commentId && <CommentForm replyName={nickname} submitHandler={this.props.submitHandler}></CommentForm>}

                </div>
            </div>
        )
    }


    renderComments = (comment, isReply) => {
        const { content, parentCommentId, parentCommentNickname, nickname, createDate, commentId } = comment;

        const avatar = comment.avatar ? comment.avatar : "https://res-blog-public.s3.ca-central-1.amazonaws.com/default_avatar.jpg"



        return (
            <div className={!isReply && styles.commentWrapper}>
                <div className={styles.commentContainer} style={isReply ? { marginLeft: 35, paddingLeft: 15, borderLeft: "1px solid red" } : {}}>
                    <div>
                        <Avatar size={35} src={avatar}></Avatar>
                    </div>
                    <div className={styles.contentContainer}>
                        <div className={styles.head}>
                            <div>
                                <span className={styles.name}>{nickname}</span>
                                {parentCommentNickname && <span>&nbsp;&#9658; @{parentCommentNickname}</span>}

                            </div>
                        
                        </div>
                        <div className={styles.content}>
                            {content}
                        </div>
                        <div>
                            <span className={styles.time}>{dateStringToTime(createDate)}</span>&nbsp;
                            {
                                this.props.parentCommentId === commentId ?
                                    <span className={styles.iconContainer} onClick={this.cancelCommentHandler}>Cancel <Icon type="close-circle"></Icon></span>
                                    : <span className={styles.iconContainer} onClick={() => this.handleReply(commentId, nickname)}>
                                        <Icon className={styles.icon} type="message"></Icon>Reply
                                    </span>
                            }
                        </div>
                        {comment.replyComments && comment.replyComments.length > 0 &&
                            this.renderReply(comment.replyComments)
                        }

                        {this.props.parentCommentId === commentId && <CommentForm replyName={nickname} submitHandler={this.props.submitHandler}></CommentForm>}

                    </div>
                    {/* {comment.replyComments && comment.replyComments.length > 0 &&
                    this.renderReply(comment.replyComments)
                    }

                    {this.props.parentCommentId === commentId && <CommentForm replyName={nickname} submitHandler={this.props.submitHandler}></CommentForm>} */}

                </div>




            </div>


        )
    }

    cancelCommentHandler = () => {
        const { replyHandler } = this.props;
        // this.setState({
        //     parentCommentId: undefined
        // })
        if (replyHandler) {
            replyHandler()
        }
    }

    handleReply = (commentId, nickName) => {
        // console.log(parentCommentId)
        const { replyHandler } = this.props;

        if (replyHandler) {
            replyHandler(commentId, nickName)
        }
    }

    render() {

        const { data, paginationProps } = this.props;

        return (
            <div className={styles.segment}>
                <List
                    dataSource={data}
                    renderItem={(item) => this.renderComments(item, false)}
                    pagination={data && data.length > 0 ? paginationProps : undefined}

                >

                </List>

            </div>
        )
    }
}

export default CommentList;