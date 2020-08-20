

import React from "react";
import { Card, Button, Icon, Table, Modal, Input } from "antd";
import LinkButton from "../../components/linkbutton/linkButton.js";
import {apiGet, apiDelete} from '../../services/api';
import {isAuthenticated} from '../../services/authorize';

class Category extends React.Component {

  constructor(props){
    super(props);
    this.addInputRef = React.createRef();
    this.state = {  
      showModal: 0,    // 0: hide 1: show add modal 2: show update category modal 
      categoryList: [],
    }
  } 

  fetchCategory = () => {
    apiGet('/category').then(data => {
      console.log(data);
      this.setState({categoryList: data})
    })
  }

  componentDidMount(){
    this.fetchCategory()
  }


  showAddModal = () => {
    this.setState({showModal: 1})
  }

  showUpdateModal = () => {
    this.setState({showModal: 2})
  }

  handleAddCategory = () => {
    console.log(this.addInputRef);
    this.setState({showModal:0});
  }
  handleUpdateCategory = () => {
    console.log("updating category");
    this.setState({showModal:0});
  }
  
  handleCancel = () => {
    this.setState({showModal: 0})
  }

  handleDelete = (record) => {
    console.log('=========')
    console.log(record);
    const {_id} = record;
    const isAuthorized = isAuthenticated()
    if(isAuthorized){
      // const userId = isAuthorized.user._id;
      const {token, user} = isAuthorized;
      console.log(token, user);
      apiDelete(`/category/${_id}/${user._id}`, token).then((data) => {
        console.log(data);
        this.fetchCategory()
      }) 
    } 
  }

  render() {

    const {categoryList} = this.state;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Actions',
        dataIndex: '_id',
        width: 300,
        render: (text, record) => {
          return (
            <span>
              <LinkButton onClick={() => this.handleDelete(record)}>Delete</LinkButton>
              <LinkButton onClick={this.showUpdateModal}>Update</LinkButton>
            </span>
          )
        }
      },

    ];

    const title = "Categories Table";
    const extra = (
      <Button onClick={this.showAddModal} type="primary">
        <Icon type="plus"></Icon>
        Add
      </Button>
    )

    return (
      <Card title={title} extra={extra} >
        <Table 
          dataSource={categoryList} 
          columns={columns} 
          bordered 
          pagination={{ pageSize: 6 }}
          rowKey={(record) => (record._id)}
        >
        </Table>
        <Modal
          centered
          title="Add new category"
          visible={this.state.showModal === 1}
          onOk={this.handleAddCategory}
          onCancel={this.handleCancel}
        >
          <div style={{marginBottom: 10}}>Name:</div>
          <Input ref={this.addInputRef} type="text" placeholder="new category"></Input>
        </Modal>
        <Modal
          centered
          title="Update category"
          visible={this.state.showModal === 2}
          onOk={this.handleUpdateCategory}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Card>
    )
  }
}

export default Category;