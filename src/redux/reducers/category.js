

export const actionTypes = {
  FETCH_CATEGORY_LIST: "FETCH_CATEGORY_LIST",

  FETCH_HOME_CATEGORY_LIST: "FETCH_HOME_CATEGORY_LIST",

  SAVE_CATEGORY_LIST: "SAVE_CATEGORY_LIST",
  ADD_OR_UPDATE_CATEGORY: "ADD_OR_UPDATE_CATEGORY",
  DELETE_CATEGORY: "DELETE_CATEGORY",
  SET_LOADING: "SET_LOADING",
}


export const actions = {
  fetchList: (payload) => ({ type: actionTypes.FETCH_CATEGORY_LIST, payload }),

  fetchHomeCategoryList: (payload, callback) => ({type: actionTypes.FETCH_HOME_CATEGORY_LIST, payload, callback}),

  saveList: (payload) => ({ type: actionTypes.SAVE_CATEGORY_LIST, payload }),
  addUpdateCategory: (payload, callback) => ({type: actionTypes.ADD_OR_UPDATE_CATEGORY, payload, callback}),
  delteCategory: (payload, callback) => ({type: actionTypes.DELETE_CATEGORY, payload, callback}),
  setLoading: (payload) => ({ type: actionTypes.SET_LOADING, payload}),
}

const PAGESIZE = 1;

const initialState = {
  isLoading: false,
  data: {
    list: [],
    pagination: { current: 1, pageSize: PAGESIZE }
  }
}

export default ( state = initialState, action ) => {
  const {payload} = action;
  switch (action.type){
    case actionTypes.SAVE_CATEGORY_LIST: 
      return {...state, data: action.payload}
    case actionTypes.SET_LOADING: 
      return {...state, isLoading: action.payload}

    default: 
      return state;
  }
}