
import {put, call, delay, select, takeLatest, takeEvery, all} from 'redux-saga/effects';
import { apiGet, apiDelete, apiPost, apiDelete2, parseResDetail, parseResList, parseResSubmit } from '@/services/requestApi';

import {actions, actionTypes} from '../reducers/category';
import { message } from 'antd';
// import {}



export function* fetchList(action){
  const {payload, callback} = action;
  console.log("========fetch category list")
  yield put(actions.setLoading(true))
  const pagination = yield select(state => state.myCategory.data.pagination);
  const response = yield call(apiGet, `/admin/category`, {page: 1, limit: 10});
  // const response = yield call(apiGet, `/admin/category`, {});
  console.log(response);
  yield put(actions.setLoading(false))
  const result = parseResList(response, pagination);
  // console.log(result);
  if(result){
    yield put (actions.saveList(result))
  }
}

export function* updateCategory(action){
  const {payload, callback} = action;
  // console.log(action
  // yield put(actions.setLoading(true))
  console.log(action);

  const response = yield call(apiPost, `/admin/category`, payload);
  // yield put(actions.setLoading(false))
  const result = parseResSubmit(response);
  if(result){
    message.success("Submit sucessfully")
    if(callback) callback();
  }
}

export function* deleteCategory(action){
  const {payload, callback} = action;
  console.log(action);

  const response = yield call(apiDelete, `/admin/category`, payload);
  // yield put(actions.setLoading(false))
  const result = parseResSubmit(response);
  if(result){
    message.success("Delete sucessfully")
    if(callback) callback();
  }
}


export function* fetchHomeList(action){
  const {payload, callback} = action;
  console.log("========fetch  home category list")
  yield put(actions.setLoading(true))
  const pagination = yield select(state => state.myCategory.data.pagination);
  const response = yield call(apiGet, `/categories`, {page: 1, limit: 10});
  // const response = yield call(apiGet, `/admin/category`, {});
  // console.log(response);
  yield put(actions.setLoading(false))
  const result = parseResList(response, pagination);
  // console.log(result);
  if(result){
    yield put (actions.saveList(result));
    if(callback){
      callback(result.list);
    }
  }
}


export default function* rootSaga() {
  // yield takeEvery(actionTypes.FETCH_CATEGORY_LIST, fetchList);
  // yield takeEvery(actionTypes.ADD_OR_UPDATE_CATEGORY, updateCategory);
  yield all([
    takeEvery(actionTypes.FETCH_CATEGORY_LIST, fetchList),
    takeEvery(actionTypes.FETCH_HOME_CATEGORY_LIST, fetchHomeList),
    takeEvery(actionTypes.ADD_OR_UPDATE_CATEGORY, updateCategory),
    takeEvery(actionTypes.DELETE_CATEGORY, deleteCategory),
  ])
}



