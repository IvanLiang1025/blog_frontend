

import React from "react";
import { Layout, Menu, Button, Icon, Avatar } from "antd";
import { Switch, Route } from "react-router-dom";
import Blog from '@/pages/Admin/Blog/index';
import BlogForm from '@/pages/Admin/Blog/BlogForm';
import Tag from '@/pages/Admin/Tag';
import Category from '@/pages/Admin/Category';
import RouteView from "@/router";
import { withRouter, Link } from "react-router-dom";
import styles from './index.less';
import AnimationLoader from "@/Components/AnimationLoader";


const { Header, Footer, Content, Sider } = Layout;

@withRouter
class Admin extends React.Component {

  state = {
    collapsed: false,
  };


  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


  handleMenuSelect = ({ key }) => {
    console.log(this.props);
    const { history } = this.props;
    console.log(key);

    // const history = useHistory();
    history.push(`${key}`)

  }

  render() {

    const pathname = this.props.location.pathname;
    return (

      <Layout style={{ minHeight: '100vh' }}>
        <Header className={styles.header}>
          <div className={styles.leftHeader}>Admin Console | 
          <Link to="/home">Home</Link>
          </div>
          <div className={styles.rightHeader}>
            <Avatar size={50} src="https://res-blog-public.s3.ca-central-1.amazonaws.com/default_avatar.jpg"></Avatar>
          </div>
        </Header>
        <Layout>
          <Sider 
            // style={{backgroundColor: '#F3FFF1'}} 
            collapsible collapsed={this.state.collapsed} 
            // onCollapse={this.toggleCollapsed}
           trigger={null}>
            <div style={{textAlign: "center", paddingTop: 10, marginBottom: 15}}>
              {/* <Button type="primary" onClick={this.toggleCollapsed} style={{marginBottom: 10}}>
                <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
              </Button> */}
              <Icon 
                style={{color: 'white', fontSize: 16}}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} 
                onClick={this.toggleCollapsed}
              />
            </div>

            <Menu
              theme="dark"
              defaultSelectedKeys={[pathname === "/admin" ? "/admin/blog" : pathname]}
              style={{ lineHeight: '64px' }}
              onSelect={this.handleMenuSelect}
              mode="inline"
            // inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="/admin/blog">
                <Icon type='read'></Icon>
                <span>Blog Management</span>
              </Menu.Item>
              <Menu.Item key="/admin/category">
                <Icon type="project"></Icon>
                <span>Category Management</span>
              </Menu.Item>
              <Menu.Item key="/admin/comment">
                <Icon type="message"></Icon>
                <span>Comment Management</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: 20 }}>
            <React.Suspense fallback={<AnimationLoader message="Please wait while loading page"/>}>
              <RouteView routes={this.props.routes}></RouteView>
            </React.Suspense>
        
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Admin;