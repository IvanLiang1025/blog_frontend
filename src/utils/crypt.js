

export function encodeBase64(str) {
    return window.btoa(encodeURIComponent(str));
}

export function decodeBase64(str) {
    
    return decodeURIComponent(window.atob(str));
}


export function encodeUrlParam(str) {
    if(!str) return;
    return encodeBase64(str);
}

export function decodeUrlParam(str){
    if(!str) return;
    return decodeBase64(str)
}



export function encodeQuery(query){
    // console.log(Object.prototype.toString.call({}))
    if(Object.prototype.toString.call(query) !== "[object Object]"){
        return {};
    }

    return {
        code: encodeBase64(JSON.stringify(query))
    }
}

export function decodeQuery(query){
    const {code} = query || {};
    if(!code) return;

    return JSON.parse( decodeBase64(code))
}