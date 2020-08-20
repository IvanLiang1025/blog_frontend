

import React from "react";
import {Layout} from "antd";
import MyHeader from "../../components/header";
import LeftNav from "../../components/left-nav";
import {Switch, Route, Redirect} from "react-router-dom";
import Product from "../product/product.js";
import Home from "../home/home";
import Category from "../category/category.js";
import { normalize } from "path";


const {Header, Footer, Content, Sider} = Layout;

class Admin extends React.Component {

    render() {
        console.log("Admin")
        return (
            <Layout style={{height: "100%"}}>
                <Sider style={{backgroundColor: "white"}}><LeftNav></LeftNav></Sider>
                <Layout>
                    {/* <Header style={{backgroundColor: "white"}}><MyHeader></MyHeader></Header> */}
                 <MyHeader></MyHeader>
                    <Content style={{margin: "25px", backgroundColor: "white"}}>
                        <Switch>
                            <Route path="/product" exact component={Product}></Route>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/category" exact component={Category}></Route>
                            <Redirect to="/home"></Redirect>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>     
        )
    }
}

export default Admin;