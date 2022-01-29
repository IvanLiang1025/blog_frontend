export const actionTypes = {
    POST_COMMENT: "POST_COMMENT",
    FETCH_HOME_COMMENT_LIST: "FETCH_HOME_COMMENT_LIST",
    SAVE_COMMENT_LIST: "SAVE_COMMENT_LIST",
    SET_LOADING: "SET_LOADING",
    SET_PAGINATION: "SET_PAGINATION",

    //for admin
    FETCH_COMMENT_LIST: "FETCH_COMMENT_LIST",
    POST_COMMENT_ADMIN:  "POST_COMMENT_ADMIN",
    DELETE_COMMENT: "DELETE_COMMENT",

}

export const actions = {
    postComment: (payload, callback) => ({type: actionTypes.POST_COMMENT, payload, callback}),
    //for home page
    fetchCommentList: (payload, callback) => ({type: actionTypes.FETCH_HOME_COMMENT_LIST, payload, callback}),
    //for admin
    fetchAdminCommentList: (payload, callback) => ({type: actionTypes.FETCH_COMMENT_LIST, payload, callback}),
    postAdminComment: (payload, callback) => ({type: actionTypes.POST_COMMENT_ADMIN, payload, callback}),
    deleteComment: (payload, callback) => ({type: actionTypes.DELETE_COMMENT, payload, callback}),

    setLoading: (payload) => ({type: actionTypes.SET_LOADING, payload}),
    saveList: (payload) => ({type: actionTypes.SAVE_COMMENT_LIST, payload}),
    setPagination: (payload) => ({type: actionTypes.SET_PAGINATION, payload})
}

const PAGESIZE = 15;

const initialState = {
    data: {
        list: [],
        pagination: {current: 1, pageSize: PAGESIZE}
    },
    isLoading: false,


}


export default (state=initialState, action) => {
    const {type, payload} = action;
    const newState = {...state};
    
    switch(type){
        case actionTypes.SET_LOADING:

            return {...state, isLoading: payload};
        case actionTypes.SAVE_COMMENT_LIST:
            return {...state, data: payload}
        case actionTypes.SET_PAGINATION:
           
            if(payload.page){
                newState.data.pagination.current = payload.page
            }
            return {...newState};
        default:
            return state;
    }
}