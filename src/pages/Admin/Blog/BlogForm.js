

import React from 'react';

import {
  Form,
  Input,
  Select,
  Button,
  message,
  Row,
  Col
} from 'antd';
// import Dashboard from '../Dashboard';

import styles from '@/global.less'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as categoryActions } from '@/redux/reducers/category';
import { actions as blogActions } from '@/redux/reducers/blog';
// import { getBlogFlagOptions } from '@/services/options';
import { Link, withRouter } from "react-router-dom";
import MarkDown from '@/pages/Common/Markdown';
import { getBlogStatusOptions, getBlogTypeOptions } from '@/services/options';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const { Option } = Select;

const mapStateToProps = (state) => {
  return {
    categoryList: state.myCategory.data.list,
    isLoading: state.myCategory.isLoading,
    blogDetail: state.myBlog.blogDetail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      fetchBlog: (payload, callback) => blogActions.fetchBlog(payload, callback),
      fetchCategoryList: (payload) => categoryActions.fetchList(payload),
      addOrUpdateBlog: (payload, callback) => blogActions.addOrUpdateBlog(payload, callback),
    }, dispatch),
  }
}


@Form.create()
@connect(mapStateToProps, mapDispatchToProps)
class BlogForm extends React.PureComponent {

  state = {
    mdContent: '',
    // htmlContent: '',
  }

  componentDidMount() {
    const { dispatch, fetchCategoryList, fetchBlog } = this.props;
    
    const id = this.hasId();
    if (id) {
      fetchBlog({ id }, (response) => {
        
        this.setState({
          mdContent: response.content
        })
      })
    }
    fetchCategoryList();
  }

  hasId = () => {
    const { match } = this.props;
    const { id } = match.params;
    if (id) { return parseInt(id) };
    return false;
  }

  handleSubmit = () => {
    const { form, addOrUpdateBlog, blogDetail } = this.props;
    const { mdContent } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      
      if (!mdContent) {
        message.warn("Please input the content");
        return;
      }
      fieldsValue.categoryId = parseInt(fieldsValue.categoryId);

      const postData = {
        content: mdContent,
        ...fieldsValue
      }
      const id = this.hasId();
      if (id) postData.articleId = id;

      addOrUpdateBlog(postData, () => {
        form.resetFields();
        if (!id) {
          // form.resetFields();
          this.setState({
            mdContent: ''
          })
        } else {
          this.props.history.push("/admin/blog/edit");
        }
      })

    })
  }

  handleContentChange = (text) => {
    
    this.setState({
      mdContent: text
    })
  }



  getCategoryOptions = () => {
    const { categoryList } = this.props;
    return categoryList.map((item) => (
      <Option key={item.id} value={item.categoryId}>
        {item.name}
      </Option>
    ))
  }

  goBack = () => {
    // console.log(this.props);
    this.props.history.goBack();
  }

  render() {
    const { form, blogDetail } = this.props;
    const { getFieldDecorator } = form;
    const { mdContent } = this.state;
    const { title, content, category, description, firstPicture, status, type } = blogDetail || {};



    return (
      // <Dashboard>
      <div className={`${styles.blogFormContainer} ${styles.ivanFormItem}`}>
        <div>
          <Button className={styles.blueButton} onClick={this.goBack}>Back</Button>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={12}>
            <Col span={12}>
              <FormItem label="Title">
                {
                  getFieldDecorator('title', {
                    initialValue: (this.hasId() && title) || '',
                    rules: [
                      { required: true, message: 'Please input the title' },
                      { max: 300, message: "The max length of title is 300 characters" }
                    ]
                  })(
                    <Input placeholder="Please input the title"></Input>
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Main picture (URL)">
                {
                  getFieldDecorator('firstPicture', {
                    initialValue: (this.hasId() && firstPicture) || "",
                    rules: [
                      // { required: true, message: 'Please input the title' },
                      // { max: 300, message: "The max length of title is 300 characters" }
                    ]
                  })(
                    <Input placeholder="Please input the url of the main picture"></Input>
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <FormItem label="Category">
                {
                  getFieldDecorator('categoryId', {
                    initialValue: (this.hasId() && category && category.categoryId) || "",
                    rules: [
                      { required: true, message: 'Please choose the category' },
                      // { max: 300, message: "The max length of title is 300 characters" }
                    ]
                  })(
                    <Select placeholder="Please choose the category">
                      {this.getCategoryOptions()}
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <Form.Item label="Status">
                {
                  getFieldDecorator("status", {
                    initialValue: (this.hasId() && status) || 0,
                    rules: [
                      { required: true, message: "Please choose the status" }
                    ]
                  })(
                    <Select>
                      {getBlogStatusOptions()}
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="type">
                {
                  getFieldDecorator("type", {
                    initialValue: (this.hasId() && type) || 1,
                    rules: [
                      { required: true, message: "Please choose the type" }
                    ]
                  })(
                    <Select>
                      {getBlogTypeOptions()}
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <FormItem label="Description">
            {
              getFieldDecorator('description', {
                initialValue: (this.hasId() && description) || "",
                // initialValue: (this.hasId() && category && category.categoryId) || undefined,
                rules: [
                  { required: true, message: 'Please input the description' },
                  // { max: 300, message: "The max length of title is 300 characters" }
                ]
              })(
                <Input.TextArea rows={4} placeholder="please input the description"></Input.TextArea>
              )
            }
          </FormItem>

          <FormItem label="* Content">
            <MarkDown
              handleContentChange={this.handleContentChange}
              value={mdContent}
            ></MarkDown>
          </FormItem>


          {/* <MarkDown
            handleContentChange={this.handleContentChange}
            value={mdContent}
          ></MarkDown> */}

        </Form>
        <div style={{ textAlign: 'right', marginTop: 10 }}>
          <Button className={styles.whiteButton}><Link to='/admin/blog'>Cancel</Link></Button>
          <Button className={styles.blueButton} onClick={this.handleSubmit}>Complete</Button>
        </div>

      </div>
      // </Dashboard>
    )
  }
}



export default withRouter(BlogForm);