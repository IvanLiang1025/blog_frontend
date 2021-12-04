
import React from 'react';
import styles from './Dashboard.less';

import {
  Menu, 
} from 'antd';
import {withRouter, Link} from 'react-router-dom';
import RouteView from '@/router';

class Dashboard extends React.PureComponent {


  handleMenuSelect = ({key}) => {
    console.log(this.props);
    const {history} = this.props;
    console.log(key);
    
    // const history = useHistory();
    history.push(`/admin/${key}`)

  }

  render() {

    const { children,routes } = this.props;
    // console.log(this.props);


    return (
      <div className={styles.contentFrame}>
        <div className={styles.leftFrame}>
          {children}
          <Menu
            theme="dark"
            // defaultSelectedKeys={['blog']}
            style={{ lineHeight: '64px' }}
            onSelect = {this.handleMenuSelect}
          >
            <Menu.Item key="blog">My Blogs</Menu.Item>
            <Menu.Item key="category">My Categories</Menu.Item>
            <Menu.Item key="tag">My Tags</Menu.Item>
          </Menu>
        </div>
        <div className={styles.rightFrame}>
          {<RouteView routes={this.props.routes}></RouteView>}
        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard);
