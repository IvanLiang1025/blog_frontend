
import React from "react";

import {Menu, Icon} from "antd";
import {Link, withRouter} from "react-router-dom";
import menuList from "../../config/menuConfig.js";

const {SubMenu} = Menu;

class LeftNav extends React.Component{

    getMenuNodes (list) {
        const path = this.props.location.pathname;
        return list.map((item, index) => {
            if(item.children) {
                if(item.children.find((cItem) => {
                    return cItem.key === path;   
                })){
                    this.openKey = item.key;
                }
                
                return (
                    <SubMenu 
                    key={item.key}
                    title={
                        <span>
                            <Icon type={item.iconType}></Icon>
                            <span>{item.title}</span>
                        </span>
                        
                    }>
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }else{
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.route}>
                            <Icon type={item.iconType}></Icon>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
        }) 
    }

    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);

    }
    

    render() {
       
        const path = this.props.location.pathname;
        console.log("left nav")
        return (
            <div >
                <Menu 
                    selectedKeys={[path]} 
                    defaultOpenKeys={[this.openKey]}
                    theme="dark" 
                    mode = "inline"
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}



export default withRouter(LeftNav);