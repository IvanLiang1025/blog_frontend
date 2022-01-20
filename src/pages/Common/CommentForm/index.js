import React from 'react';
import {
    Form,
    Row,
    Col,
    Input,
    Button
} from 'antd';
import styles from './index.less';


const FormItem = Form.Item;
const { TextArea } = Input;

const emailValidator = (rule, value, callback) => {
    if (!value) callback();

    const reg = /^\w+((\.\w+)|(\-\w+))*\@[A-Za-z0-9]+((\.|\-)[A-Za-z0-9])*\.[A-Za-z0-9]+$/;
    // const reg = /^\w+((-\w+)|(\.\w+)|(\+\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

    if (!reg.test(value)) {
        callback("Incorrect email format");
    }
    callback();
}

@Form.create()
class CommentForm extends React.Component {

    state = {
        loading: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, submitHandler } = this.props
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            this.setState({
                loading: true
            })
            submitHandler(fieldsValue, () => {
                this.setState({ loading: false });
                form.resetFields();
            });

        })
    }

    render() {

        const { form: { getFieldDecorator }, replyName } = this.props;


        return (
            <div className={styles.formContainer}>
                <Form onSubmit={this.handleSubmit}>
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
                                    placeholder={replyName ? `@${replyName}, ` : "Please leave your new comment"}
                                    rows={4}
                                >
                                </TextArea>
                            )
                        }
                    </FormItem>
                    <Row gutter={24}>
                        <Col sm={{ span: 8 }}>
                            <FormItem>
                                {
                                    getFieldDecorator("nickname", {
                                    
                                        rules: [
                                            { required: true, message: "Please input your nickname" },
                                            { max: 100, message: "Please input no more than 100 characters" }
                                        ]
                                    })(
                                        <Input placeholder="Nickname" />
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col sm={{ span: 8 }}>
                            <FormItem>
                                {
                                    getFieldDecorator("email", {
                                        rules: [
                                            { required: true, message: "Please input your email address" },
                                            { max: 100, message: "Please input no more than 100 characters" },
                                            { validator: emailValidator }
                                        ]
                                    })(
                                        <Input placeholder="Email" />
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col sm={{ span: 8 }}>
                            <FormItem>
                                <Button 
                                loading={this.state.loading}
                                htmlType="submit" className={styles.blueButton} style={{ marginLeft: 0 }}>Submit</Button>

                                {/* {cancelCommentHandler && 
                                <Button 
        
                                className={styles.blueButton} style={{ marginLeft: 0 }}>Cancel</Button>
                                
                                } */}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default CommentForm;