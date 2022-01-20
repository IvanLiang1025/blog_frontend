import React from 'react';
import {
  Table, Popconfirm, Icon, Button
} from 'antd';

import { dateStringToTime } from '@/utils/dateUtils.js';
import { connect } from "react-redux";
import { actions } from '@/redux/reducers/blog';
import { bindActionCreators } from 'redux';
import styles from './index.less';
import {Link} from 'react-router-dom';
import {getBlogStatusLabel, getBlogTypeLabel, getBlogTypeOptions} from "@/services/options";




class BlogLIst extends React.PureComponent {

  state = {
    modalCategoryVisible: false,
    categoryData: {},
  }

  componentDidMount() {
    const { fetchBlogList } = this.props;
    // console.log(this.props);
    fetchBlogList();
  }

  columns = [
    {
      title: 'No.',
      key: "number",
      render: (text, record, index) => (index + 1)
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: text => (
        text
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => getBlogStatusLabel(text)
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: text => getBlogTypeLabel(text)
    },
    {
      title: 'Created at',
      dataIndex: 'createDate',
      key: 'createDate',
      render: text => {
        return dateStringToTime(text)
      }
    },
    {
      title: "Updated at",
      dataIndex: "updateDate",
      key: "updateDate",
      render: text => (dateStringToTime(text))
    },
    {
      title: "User Id",
      dataIndex: "userInfo",
      key: "userId",
      render: text => (text.userId)
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      key: "actions",
      width: 100,
      render: (text, record) => {
        return this.renderButtons(record)
      }
    },

  ];

  renderButtons = (data) => {
    return (
      <span>
        <Popconfirm
          onConfirm={() => this.handleDelete(data)}
          title='Are you sure you want to delete this blog?'
          okText='Confirm'
        >
          <Icon type='delete'></Icon>
        </Popconfirm>
        <Link to={`/admin/blog/edit/${data.articleId}`}>
          <Icon type='edit' style={{ marginLeft: 5 }}></Icon>
        </Link>
        {/* <Icon type='edit' style={{ marginLeft: 5 }} onClick={() => this(true, data)}></Icon> */}
      </span>
    )
  }


  handleAdd = (value, callback) => {
    const { addUpdateCategory, fetchBlogList } = this.props;
    const { categoryData: { id } } = this.state;
    console.log(value);
    const postData = id ? { ...value, id } : { ...value };
    addUpdateCategory(postData, (res) => {
      console.log(res);
      fetchBlogList();
      // this();
      callback && callback();
    });
  }

  handleDelete = (data) => {
    const {id} = data;
    const {deleteBlog, fetchBlogList} = this.props;
    deleteBlog({id}, () => {
      fetchBlogList()
    })
  }

  render() {
    const { blogList, isLoading } = this.props;
    // const { modalCategoryVisible, categoryData } = this.state;
    

    return (
      <div className={styles.pageLayout}>
        <div className={styles.titleContainer}>
          {/* <div className={styles.title}>
            Blog
          </div> */}
          <div>
            <Button className={styles.blueButton}><Link to="/admin/blog/edit">New</Link></Button>
          </div>
        </div>
        <Table
          dataSource={blogList}
          columns={this.columns}
          bordered
          loading={isLoading}
          // pagination={paginationProp}
          rowKey={(record) => (record.articleId)}
        >
        </Table>


      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categoryList: state.myCategory.data.list,
    // isLoading: state.myCategory.isLoading,
    blogList: state.myBlog.data.list,
    isLoading: state.myBlog.isLoading,
    // router: state.router,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // login(payload, callback) {
    //   dispatch({
    //     type: 'SET_LOGIN_STATUS',
    //     payload,
    //     callback,
    //   });
    // }
    ...bindActionCreators({
      fetchBlogList: (payload) => actions.fetchBlogList(payload),
      deleteBlog: (payload, callback) => actions.deleteBlog(payload, callback), 
    }, dispatch),
    // logIn(usernameEle, passwordEle){
    //     const username = usernameEle.value;
    //     const password = passwordEle.value;
    //     console.log(username, password);
    //     dispatch(actionCreators.checkLogIn(username, password));
    // }
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(BlogLIst);