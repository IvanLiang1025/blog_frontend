import React from 'react';

import {
  Table,
  Popconfirm,
  Icon,
  Tooltip,
  message
} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import styles from "./index.less";
import { actions } from "@/redux/reducers/comment";
import { dateStringToTime } from '@/utils/dateUtils';
import { encodeUrlParam } from '@/utils/crypt';
import { Link } from 'react-router-dom';
import CommentModal from './CommentModal';



const mapStateToProps = (state) => {
  return {
    commentList: state.myComment.data.list,
    pagination: state.myComment.data.pagination,
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    ...bindActionCreators({
      fetchAdminComments: (payload, callback) => actions.fetchAdminCommentList(payload, callback),
      postAdminComment: (payload, callback) => actions.postAdminComment(payload, callback),
      deleteComment: (payload, callback) => actions.deleteComment(payload, callback),
    }, dispatch),

  }
}

@connect(mapStateToProps, mapDispatchToProps)
class CommentManagement extends React.PureComponent {

  state = {
    replyModalVisible: false,
    repliedCommentData: {}
  }

  componentDidMount() {
    const { fetchAdminComments, pagination } = this.props;

    fetchAdminComments({
      page: 1,
      limit: pagination.pageSize
    })
  }

  renderActions = (data) => {
    return (
      <span>
        <Popconfirm
          onConfirm={() => this.handleDelete(data)}
          title='This will also delete all its child comments. Are you sure?'
          okText='Confirm'
        >
          <Tooltip title="Delete">
            <Icon type='delete'></Icon>
          </Tooltip>
        </Popconfirm>
        <Tooltip title="Reply">
          <Icon type='message' onClick={() => this.handleReplyModalVisible(true, data)}></Icon>
        </Tooltip>
        {/* <Icon type='message' style={{ marginLeft: 5 }} onClick={() => this.handleReplyModalVisible(true, data)}></Icon> */}
      </span>
    )
  }

  handleReplyModalVisible = (visible, repliedComment) => {
    
    this.setState({
      replyModalVisible: !!visible,
      repliedCommentData: repliedComment || {}
    })
  }

  columns = [

    {
      title: 'Nickname',
      dataIndex: 'nickname',
      render: text => (
        text
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: text => text
    },
    {
      title: 'Content',
      dataIndex: 'content',
      render: text => text
    },
    {
      title: 'Article',
      dataIndex: 'title',
      render: (text, record, index) => {
        return <a href={`/blog/detail/${encodeUrlParam(record.articleId)}`} target='blank_target'>{text}</a>
      }
    },
    {
      title: 'Posted at',
      dataIndex: 'createDate',
      render: text => {
        return dateStringToTime(text)
      }
    },
    {
      title: 'Actions',
      key: "actions",
      width: 100,
      render: (text, record) => {
        return this.renderActions(record)
      }
    },

  ];


  handlePageChange = (page) => {
    const { fetchAdminComments, pagination } = this.props;

    fetchAdminComments({
      page,
      limit: pagination.pageSize,
      total: pagination.total
    })
  }

  handleDelete = (data) => {
    const {commentId} = data;
    const {deleteComment, fetchAdminComments, pagination} = this.props;

    deleteComment({commentId}, () => {

      fetchAdminComments({ page: pagination.current, limit: pagination.pageSize, total: pagination.total})
      
      message.success("Delete related comments successfully.")
    })

  }

  replyHandler = (formValues, callback) => {
    const { repliedCommentData} = this.state;
    const { postAdminComment, pagination, fetchAdminComments } = this.props;
    // console.log("=======")
    const postData = { ...formValues };
    

    postData.articleId = repliedCommentData.articleId;

    postData.parentCommentId = repliedCommentData.commentId

    postData.parentCommentNickname = repliedCommentData.nickname
    console.log(postData);

    postAdminComment(postData, () => {
      fetchAdminComments({ page: pagination.current, limit: pagination.pageSize, total: pagination.total})
      
      message.success("Submit comment successfully.")

      this.handleReplyModalVisible()

      if (callback) callback();
    });
  }

  render() {
    const { commentList, pagination } = this.props
    const paginationProps = {
      ...pagination,
      onChange: this.handlePageChange,
      showTotal: () => `Total: ${pagination.total}`
    }

    return (
      <div className={styles.pageLayout}>

        <Table
          dataSource={commentList}
          columns={this.columns}
          bordered
          rowKey={(record) => (record.commentId)}
          pagination={paginationProps}
        >
        </Table>
        <CommentModal
          visible={this.state.replyModalVisible}
          onClose={() => this.handleReplyModalVisible()}
          title="Reply"
          data={this.state.repliedCommentData}
          submitHandler={this.replyHandler}
        ></CommentModal>


      </div>
    )
  }
}

export default CommentManagement;