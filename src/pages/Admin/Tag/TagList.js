import React from 'react';
import {
  Table, Popconfirm, Icon
} from 'antd';

import { dateStringToTime } from '@/utils/dateUtils.js';
import {connect} from "react-redux"; 
import {actions} from '@/redux/reducers/tag';
import { bindActionCreators } from 'redux';



class BlogList extends React.PureComponent{

  componentDidMount(){
    const {fetchTagList} = this.props;
    
    fetchTagList();
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Actions',
      dataIndex: '_id',
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
          title='Are you sure you want to delete this category?'
          okText='Confirm'
        >
          <Icon type='delete'></Icon>
        </Popconfirm>
        <Icon type='edit' style={{ marginLeft: 5 }} onClick={() => this.showAddModal(true, data)}></Icon>
      </span>
    )
  }

  render() {
    const {tagList} = this.props;
    
    return (
      <div>
        <Table
          dataSource={tagList}
          columns={this.columns}
          bordered
          // pagination={paginationProp}
          rowKey={(record) => (record._id)}
        >
        </Table>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tagList: state.myTag.data.list,
    loading: state.myTag.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      fetchTagList: (payload) => actions.fetchList(payload)
    }, dispatch),
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(BlogList);