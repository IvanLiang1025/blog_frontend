
import React from "react";
import "./header.scss";
import menuList from "../../config/menuConfig.js";
import { withRouter, Link} from "react-router-dom";
import formateDate from "../../utils/dateUtli.js"

class MyHeader extends React.Component{

    constructor(){
        super();
        this.state = {
            currentTime: formateDate(new Date()),
        };
    }

    showTime = () => {
        this.timer = setInterval(() => {
            const currentTime = new Date();
            this.setState({currentTime: formateDate(currentTime)})
        }, 1000);
    }

    getTitle= (list) => {
        // debugger
        const path = this.props.location.pathname;
        for(const item of list){
            if(item.children){
                this.getTitle(item.children);
            }else{
                if(path === item.key){
                    this.title = item.title;
                }
            }
        }

        return this.title;        
    }

    componentDidMount() {
        this.showTime(); 
    }
    
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {

        const title = this.getTitle(menuList);
        return (
            <div className="header">
                <div className="header-top">
                    <span>Welcome, <strong>Admin</strong></span>
                    {/* <a href="#">Log out</a> */}
                    <Link to='/login'>Log out</Link>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>
                            {this.state.currentTime}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MyHeader);