
import {put, call, select, takeEvery, all} from 'redux-saga/effects';
import { apiGet, apiDelete, apiPost, parseResList, parseResSubmit, parseResDetail } from '@/services/requestApi';

import {actions, actionTypes} from '../reducers/blog';
import { message } from 'antd';
// import {}



export function* fetchList(action){
  const {payload, callback} = action;
  // console.log(action)

  
  if(payload && payload.page){
    yield put(actions.setPagination({page: payload.page}))
  }
  yield put(actions.setLoading(true))
  const pagination = yield select(state => state.myBlog.data.pagination);
  const response = yield call(apiGet, `/admin/article`, payload);
  
  yield put(actions.setLoading(false))
  const result = parseResList(response, pagination);

  if(result){
    yield put (actions.saveList(result))
  }
}

export function* editBlog(action){
  const {payload, callback} = action;
  
  const response = yield call(apiPost, `/admin/article`, payload);
  // yield put(actions.setLoading(false))
  const result = parseResSubmit(response);
  if(result){
    message.success("Submit sucessfully")
    if(callback) callback();
  }
}

export function* deleteBlog(action){
  const {payload, callback} = action;
  console.log(action);

  const response = yield call(apiDelete, `/admin/blog`, payload);
  const result = parseResSubmit(response);
  if(result){
    message.success("Delete sucessfully")
    if(callback) callback();
  }
}

export function* fetchBlog (action){
  const {payload, callback} = action;
  const {id} = payload;
  // console.log("==============")
  // console.log(action);
  yield put(actions.setLoading(true))
  const response = yield call(apiGet, `/admin/article/${id}`);
  yield put(actions.setLoading(false))
  // console.log(response);
  const result = parseResSubmit(response);
  // console.log(result);
  if(result){
    yield put(actions.saveBlogDetail(result))
    // message.success("Submit sucessfully")
    if(callback) callback(result);
  }
}



export function* fetchHomeList(action){
  const {payload, callback} = action;

  console.log("============********* ==============******")

  if(payload && payload.page){
    yield put(actions.setPagination({page: payload.page}))
  }

  console.log(payload)

  yield put(actions.setLoading(true))
  const pagination = yield select(state => state.myBlog.data.pagination);
  const response = yield call(apiGet, `/articles`, payload);
  // console.log(response);
  yield put(actions.setLoading(false))
  const result = parseResList(response, pagination);
  
  if(result){
    yield put (actions.saveList(result))
  }
}

export function* fetchHomeBlog (action){
  const {payload, callback} = action;
  const {id} = payload;
  // console.log("==============")
  // console.log(action);
  yield put(actions.setLoading(true))
  const response = yield call(apiGet, `/article/${id}`);
  yield put(actions.setLoading(false))
  // console.log(response);
  const result = parseResSubmit(response);
  // console.log(result);
  if(result){
    yield put(actions.saveBlogDetail(result))
    // message.success("Submit sucessfully")
    if(callback) callback(result);
  }
}

export function* fetchHotList(action){
  const {payload, callback} = action;
  const response = yield call(apiGet, `/articles/hot`, payload || {});
  // console.log(response)
  
  const result = parseResDetail(response); 
  
  if(result){
    yield put (actions.saveHotList(result))
  }
}


export default function* rootSaga() {

  yield all([
    takeEvery(actionTypes.FETCH_BLOG, fetchBlog),
    takeEvery(actionTypes.FETCH_BLOG_LIST, fetchList),
    takeEvery(actionTypes.ADD_OR_UPDATE_BLOG, editBlog),
    takeEvery(actionTypes.DELETE_BLOG, deleteBlog),
    takeEvery(actionTypes.FETCH_HOME_BLOG_LIST, fetchHomeList),
    takeEvery(actionTypes.FETCH_HOME_BLOG, fetchHomeBlog),
    takeEvery(actionTypes.FETCH_HOT_LIST, fetchHotList)
  ])
}



