

export const actionTypes = {
  FETCH_TAG_LIST: "FETCH_TAG_LIST",
  SAVE_TAG_LIST: "SAVE_TAG_LIST",
  SET_LOADING: "SET_LOADING"
}


export const actions = {
  fetchList: (payload) => ({ type: actionTypes.FETCH_TAG_LIST, payload }),
  saveList: (payload) => ({ type: actionTypes.SAVE_TAG_LIST, payload }),
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
    case actionTypes.SAVE_TAG_LIST: 
      return {...state, data: action.payload}
    case actionTypes.SET_LOADING: 
      return {...state, isLoading: action.payload}

    default: 
      return state;
  }
}