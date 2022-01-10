export const actionTypes = {
    POST_COMMENT: "POST_COMMENT",
    FETCH_COMMENT_LIST: "FETCH_COMMENT_LIST",
    SAVE_COMMENT_LIST: "SAVE_COMMENT_LIST",
    SET_LOADING: "SET_LOADING",
    SET_PAGINATION: "SET_PAGINATION",

}

export const actions = {
    postComment: (payload, callback) => ({type: actionTypes.POST_COMMENT, payload, callback}),
    fetchCommentList: (payload, callback) => ({type: actionTypes.FETCH_COMMENT_LIST, payload, callback}),
    setLoading: (payload) => ({type: actionTypes.SET_LOADING, payload}),
    saveList: (payload) => ({type: actionTypes.SAVE_COMMENT_LIST, payload}),
    setPagination: (payload) => ({type: actionTypes.SET_PAGINATION, payload})
}

const PAGESIZE = 5;

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
            return newState;
        default:
            return state;
    }
}