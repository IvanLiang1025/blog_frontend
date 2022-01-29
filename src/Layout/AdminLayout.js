

import React from "react";
import { Layout, Menu } from "antd";
import { Switch, Route } from "react-router-dom";
import Blog from '@/pages/Admin/Blog/index';
import BlogForm from '@/pages/Admin/Blog/BlogForm';
import Tag from '@/pages/Admin/Tag';
import Category from '@/pages/Admin/Category';
import RouteView from "@/router";





const { Header, Footer, Content, Sider } = Layout;

class Admin extends React.Component {

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    
    this.setState({ collapsed });
  };

  render() {
    return (

      <Layout>
      <Header style={{backgroundColor: '#fff'}}>Header vv</Header>
      <Layout>
        <Sider>
        <Menu
            theme="dark"
            // defaultSelectedKeys={['blog']}
            style={{ lineHeight: '64px' }}
            // onSelect = {this.handleMenuSelect}
          >
            <Menu.Item key="blog">My Blogs</Menu.Item>
            <Menu.Item key="category">My Categories</Menu.Item>
            <Menu.Item key="tag">My Tags</Menu.Item>
          </Menu>
        </Sider>
        <Content>Content
            <RouteView routes={this.props.routes}></RouteView>
        </Content>
      </Layout>
      {/* <Footer>Footer</Footer> */}
    </Layout>

      // <Layout>
      //   <Header>
      //     {/* <div className="logo" />
      //     <Menu
      //       theme="dark"
      //       mode="horizontal"
      //       // defaultSelectedKeys={['2']}
      //       style={{ lineHeight: '64px' }}
      //     >
      //       <Menu.Item key="1">nav 1</Menu.Item>
      //       <Menu.Item key="2">nav 2</Menu.Item>
      //       <Menu.Item key="3">nav 3</Menu.Item>
      //     </Menu> */}
      //   </Header>
      //   <div>
      //     {/* <div>hello</div> */}
      //     <Switch>
      //       {/* <Route path="/admin/blogs" exact component={Blog}></Route> */}
      //       <Route path="/admin/tag" exact component={Tag}></Route>
      //       <Route path="/admin/category" exact component={Category}></Route>
      //       <Route path="/admin/blog" exact component={Blog} ></Route>
      //       <Route path="/admin/blog/add" exact component={BlogForm} ></Route>
      //       <Route path="/admin/blog/add/:id" exact component={BlogForm} ></Route>
      //       <Route path="/blog" exact component={BlogForm} ></Route>
      //       {/* <Route path='/admin/markdown' exact */}
      //       {/* <Redirect to="/home"></Redirect>  */}
      //     </Switch>
      //   </div>
      //   <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
      // </Layout>
    )
  }
}

export default Admin;