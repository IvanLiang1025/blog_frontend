import React from 'react';

import {
    Button,
    List,
    Icon,
    Avatar
} from "antd";
import { dateStringToTime } from "@/utils/dateUtils";
import styles from './index.less';
import CommentForm from '@/pages/Common/CommentForm';



class CommentList extends React.Component {


    renderReply = (replyComments) => {
        // console.log(replyComments)
        return replyComments.map((item) => {
            return this.renderComments(item)
        })
    }


    renderComments = (comment) => {
        const content = comment.parentCommentNickname ?
            `@${comment.parentCommentNickname} ${comment.content}`
            : comment.content;

        const avatar = comment.avatar ? comment.avatar : "https://res-blog-public.s3.ca-central-1.amazonaws.com/default_avatar.jpg"



        return (
            <div className={styles.commentContainer}>
                <div>
                    <Avatar size={35} src={avatar}></Avatar>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.head}>
                        <div>
                            <span className={styles.name}>{comment.nickname}</span>
                            <span className={styles.time}>&nbsp;{dateStringToTime(comment.createDate)}</span>
                        </div>
                        <div>
                            {
                                this.props.parentCommentId  === comment.commentId ?
                                    <span className={styles.iconContainer} onClick={this.cancelCommentHandler}>Cancel <Icon type="close-circle"></Icon></span>
                                    : <span className={styles.iconContainer} onClick={() => this.handleReply(comment.commentId, comment.nickname)}>
                                        <Icon className={styles.icon} type="message"></Icon>Reply
                                    </span>
                            }
                        </div>
                    </div>
                    <div className={styles.content}>
                        {content}
                    </div>
                    <div>
                        {comment.replyComments && comment.replyComments.length > 0 &&
                            this.renderReply(comment.replyComments)
                        }
                    </div>
                    {this.props.parentCommentId === comment.commentId && <CommentForm replyName={comment.nickname} submitHandler={this.props.submitHandler}></CommentForm>}
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
                    renderItem={this.renderComments}
                    pagination={data && data.length > 0? paginationProps : undefined}
                    
                >

                </List>

            </div>
        )
    }
}

export default CommentList;