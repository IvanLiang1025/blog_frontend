import React from 'react';
import {
  Table, Popconfirm, Icon, Button
} from 'antd';

import { dateStringToTime } from '@/utils/dateUtils.js';
import { connect } from "react-redux";
import { actions } from '@/redux/reducers/category';
import { bindActionCreators } from 'redux';
import styles from './index.less';
import CategoryForm from './CategoryForm';
import { call } from 'file-loader';


class TableList extends React.PureComponent {

  state = {
    modalCategoryVisible: false,
    categoryData: {},
  }

  componentDidMount() {
    const { fetchCategoryList } = this.props;
    
    fetchCategoryList();
  }

  columns = [
    {
      title: 'Number',
      render: (text, record, index) => (index + 1)
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: 'Created at',
    //   dataIndex: 'createDate',
    //   key: 'createDate',
    //   render: text => {
       
    //     return dateStringToTime(text)
    //   }
    // },
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
        <Icon type='edit' style={{ marginLeft: 5 }} onClick={() => this.handleModalCategoryVisible(true, data)}></Icon>
      </span>
    )
  }

  handleModalCategoryVisible = (flag, data) => {
    this.setState({
      modalCategoryVisible: !!flag,
      categoryData: data || {}
    })
  }

  handleAdd = (value, callback) => {
    const { addUpdateCategory, fetchCategoryList } = this.props;
    const { categoryData: { categoryId } } = this.state;
    
    const postData = categoryId ? { ...value, categoryId } : { ...value };
    addUpdateCategory(postData, (res) => {
      
      fetchCategoryList();
      this.handleModalCategoryVisible();
      callback && callback();
    });
  }

  handleDelete = (data) => {
    const {categoryId} = data;
    const {deleteCategory, fetchCategoryList} = this.props;
    deleteCategory({categoryId}, () => {
      fetchCategoryList()
    })
  }

  render() {
    const { categoryList, isLoading } = this.props;
    const { modalCategoryVisible, categoryData } = this.state;
    
    return (
      <div className={styles.pageLayout}>
        <div className={styles.titleContainer}>
          {/* <div className={styles.title}>
            Category
          </div> */}
          <div>
            <Button className={styles.blueButton} onClick={() => this.handleModalCategoryVisible(true)}>
              New Category
            </Button>
          </div>
        </div>
        <Table
          dataSource={categoryList}
          columns={this.columns}
          bordered
          loading={isLoading}
          // pagination={paginationProp}
          rowKey={(record) => (record.id)}
        >
        </Table>
        {modalCategoryVisible && <CategoryForm
          data={categoryData}
          visible={modalCategoryVisible}
          onClose={() => this.handleModalCategoryVisible()}
          handleAdd={this.handleAdd}
        ></CategoryForm>}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categoryList: state.myCategory.data.list,
    isLoading: state.myCategory.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      fetchCategoryList: (payload) => actions.fetchList(payload),
      addUpdateCategory: (payload, callback) => actions.addUpdateCategory(payload, callback),
      deleteCategory: (payload, callback) => actions.delteCategory(payload, callback), 
    }, dispatch),
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(TableList);