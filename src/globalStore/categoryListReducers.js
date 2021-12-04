

export const actionTypes = {
  FETCH_CATEGORY_LIST: "FETCH_CATEGORY_LIST",
  SAVE_CATEGORY_LIST: "SAVE_CATEGORY_LIST",
 
  SET_LOADING: "SET_LOADING",
}




export const actions = {
  fetchList: (payload) => ({ type: actionTypes.FETCH_CATEGORY_LIST, payload }),
  saveList: (payload) => ({ type: actionTypes.SAVE_CATEGORY_LIST, payload }),
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
  console.log(payload);
  switch (action.type){
    case actionTypes.SAVE_CATEGORY_LIST: 
      console.log({...state, data: action.payload})
      return {...state, data: action.payload}
    case actionTypes.SET_LOADING: 
      return {...state, isLoading: action.payload}

    default: 
      return state;
  }
}