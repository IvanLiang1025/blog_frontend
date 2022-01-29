import React, { useState } from "react";
import { Fragment } from "react";
import AnimationLoader from "@/Components/AnimationLoader";


const LoadingHOC = (WrappedComponent) => {

    function HOC(props) {
        const [isLoading, setLoading] = useState(false);

        const setLoadingState = isComponentLoading => setLoading(isComponentLoading);
    
        return (
            <Fragment>
                
                {isLoading ? <AnimationLoader></AnimationLoader> : <WrappedComponent {...props} setLoading={setLoadingState}></WrappedComponent>}

            </Fragment>
        )
    }

    return HOC;
}

export default LoadingHOC;