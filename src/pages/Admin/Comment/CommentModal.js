import React from 'react';
import {
    Drawer,
    Modal,
    Avatar,
    Icon,
    Form,
    Input
} from 'antd';
import styles from "./index.less";
import { dateStringToTime } from "@/utils/dateUtils";
import CommentForm from '@/pages/Common/CommentForm';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

@Form.create()
class CommentModal extends React.PureComponent {


    renderComment = (comment) => {

        const { content, nickname, createDate, commentId } = comment;

        const avatar = comment.avatar ? comment.avatar : "https://res-blog-public.s3.ca-central-1.amazonaws.com/default_avatar.jpg"


        return (
            <div className={styles.commentContainer}>
                <div>
                    <Avatar size={35} src={avatar}></Avatar>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.head}>
                        <div>
                            <span className={styles.name}>{nickname}</span>
                            {/* {parentCommentNickname && <span>&nbsp;&#9658; @{parentCommentNickname}</span>} */}
                        </div>
                    </div>
                    <div className={styles.content}>
                        {content}
                    </div>
                    <div>
                        <span className={styles.time}>{dateStringToTime(createDate)}</span>&nbsp;
                    </div>
                </div>
            </div>
        )
    }

    handleSubmit = () => {
        const {form, data, submitHandler} = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            
            submitHandler(fieldsValue, () => {
                form.resetFields();
            });
        })
    }

    render() {

        const { visible, onClose, title, data, form } = this.props;
        const {getFieldDecorator} = form;
        
        return (
            <Modal
                title={title}
                visible={visible}
                onOk={this.handleSubmit}
                onCancel={onClose}
                className={styles.ivanFormItem}
                okButtonProps={{ className: styles.blueButton }}
                cancelButtonProps={{ className: styles.whiteButton }}
                width={600}
            >
                <div className={styles.modalBody}>
                    {this.renderComment(data)}
                    {/* <CommentForm isAdmin></CommentForm> */}
                    <Form>
                        <FormItem>
                            {
                                getFieldDecorator("content", {
                                    // initialValue:
                                    rules: [
                                        { required: true, message: "Please input your comment" },
                                        { max: 1000, message: "Please input no more than 1000 characters" }
                                    ]
                                })(
                                    <TextArea
                                        placeholder={"Please leave your comment"}
                                        rows={4}
                                    >
                                    </TextArea>
                                )
                            }
                        </FormItem>
                    </Form>

                </div>
            </Modal>
        )
    }
}

export default CommentModal;