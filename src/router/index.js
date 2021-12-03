import React from "react";
import { Redirect, Route , Switch} from "react-router-dom";
import { checkAuth } from "@/services/authorize";


const renderRoute = (routes) => {
    return routes.map((item, index) => {
        if(item.routes){
            renderRoute(item.routes)
        }else{
           return <Route key={index} path={item.path} exact={item.exact ? true : false} component={item.component}></Route>
        }
    }) 
}



const RouteView = (props) => {
    
    return (
        <Switch>
            {
                props.routes && props.routes.map((item, index) => {  
                    
                    if(item.auth) {
                        if(!checkAuth()){
                            return <Redirect to="/login"></Redirect>
                        } 
                    }
                    
                    return (
                        <Route key={index} path={item.path} exact={item.exact ? true : false} render={(props) => {

                            // if(item.auth){
                            //     if(!checkAuth) return <Redirect to='/login'></Redirect>
                            // }

                            if(item.routes) {
                                return (
                                    <item.component {...props} routes={item.routes}></item.component>
                                )
                            }else{
                                return <item.component {...props}></item.component>
                            }
                        }}></Route>
                    )
                })
            }
        </Switch>
    )
}

export default RouteView;