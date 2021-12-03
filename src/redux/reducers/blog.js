

export const actionTypes = {
  FETCH_BLOG_LIST: "FETCH_BLOG_LIST",

  FETCH_HOME_BLOG_LIST: "FETCH_HOME_BLOG_LIST",

  SAVE_BLOG_lIST: "SAVE_BLOG_lIST",

  FETCH_HOT_LIST: "FETCH_HOT_LIST",
  SAVE_HOT_LIST: "SAVE_HOT_LIST",

  ADD_OR_UPDATE_BLOG: "ADD_OR_UPDATE_BLOG",
  DELETE_BLOG: "DELETE_BLOG",
  FETCH_BLOG: "FETCH_BLOG",
  FETCH_HOME_BLOG: "FETCH_HOME_BLOG",
  SAVE_BLOG_DETAIL: 'SAVE_BLOG_DETAIL',
  SET_LOADING: "SET_LOADING",

  // FETCH_CATEGORY_LIST: "FETCH_CATEGORY_LIST",
  SAVE_CATEGORY_LIST: "SAVE_CATEGORY_LIST",

  SET_PAGINATION: "SET_PAGINATION",

}




export const actions = {
  fetchBlog: (payload, callback) => ({ type: actionTypes.FETCH_BLOG, payload, callback }),
  fetchHomeBlog: (payload, callback) => ({type: actionTypes.FETCH_HOME_BLOG, payload, callback}),
  fetchBlogList: (payload) => ({ type: actionTypes.FETCH_BLOG_LIST, payload }),

  fetchHomeBlogList: (payload) => ({type: actionTypes.FETCH_HOME_BLOG_LIST, payload}),

  fetchHotList: (payload) => ({type: actionTypes.FETCH_HOT_LIST, payload}),
  saveHotList: (payload) => ({type: actionTypes.SAVE_HOT_LIST, payload}),
  
  addOrUpdateBlog: (payload, callback) => ({type: actionTypes.ADD_OR_UPDATE_BLOG, payload, callback}),
  deleteBlog: (payload, callback) => ({type: actionTypes.DELETE_BLOG, payload, callback}),
  
  setLoading: (payload) => ({ type: actionTypes.SET_LOADING, payload}),

  // fetchCategoryList: (payload) => ({ type: actionTypes.FETCH_CATEGORY_LIST, payload }),

  //sent to reducers
  saveList: (payload) => ({ type: actionTypes.SAVE_BLOG_lIST, payload }),
  saveBlogDetail: (payload) => ({type: actionTypes.SAVE_BLOG_DETAIL, payload}),

  setPagination: (payload) => ({type:actionTypes.SET_PAGINATION, payload})
}

const PAGESIZE = 10;

const initialState = {
  isLoading: false,
  data: {
    list: [],
    pagination: { current: 1, pageSize: PAGESIZE }
  },
  blogDetail: {},
  hotList: []
}

export default ( state = initialState, action ) => {
  const {payload} = action;
  switch (action.type){
    case actionTypes.SAVE_BLOG_lIST: 
      // console.log({...state, data: action.payload})
      return {...state, data: payload}
    case actionTypes.SET_LOADING: 
      return {...state, isLoading: payload}
    case actionTypes.SAVE_BLOG_DETAIL:
      return {...state, blogDetail: payload}
    case actionTypes.SET_PAGINATION:
      const newState = {...state};
      newState.data.pagination.current = payload.page;
      return {...newState}
    case actionTypes.SAVE_HOT_LIST:
      return {...state, hotList: payload}
    default: 
      return state;
  }
}