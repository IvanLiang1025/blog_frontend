import React, { Fragment } from 'react';
import NavBar from '@/Components/NavBar';

import RouteView from '@/router';
import AnimationLoader from '@/Components/AnimationLoader';
import Footer from '@/pages/Common/Footer';


class HomeLayout extends React.Component {

    // const { routes } = this.props;

render(){

    return (
        <Fragment>
            <NavBar></NavBar>
        
            <React.Suspense fallback={<AnimationLoader message="Please wait while loading page"></AnimationLoader>}>
                <RouteView routes={this.props.routes}></RouteView>
            </React.Suspense>
            <Footer></Footer>
        </Fragment>
    )
}
}

export default HomeLayout;