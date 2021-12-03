
export const actionTypes = {
    LOG_IN: 'LOG_IN',
    SET_STATUS: "SET_STATUS",

    SET_LOADING: "SET_LOADING"
}

export const actions = {
    login: (payload, callback) => ({type: actionTypes.LOG_IN, payload, callback}),
    setStatus: (payload) => ({type: actionTypes.SET_STATUS, payload})
}

const initialState = {
    isLoading: false,
    loginStatus: false,
}

export default (state = initialState, action) => {

    switch (action.type){
        case actionTypes.SET_LOADING: 
            return {...state, isLoading: action.payload};
        case actionTypes.SET_STATUS:
            return {...state, status: action.payload}
        default:
            return state;
    }

}