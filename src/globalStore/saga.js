
import {put, call, delay, select, takeLatest, takeEvery, all} from 'redux-saga/effects';
import { apiGet, apiDelete, apiPost, apiDelete2, parseResDetail, parseResList, parseResSubmit } from '@/services/requestApi';

import {actions, actionTypes} from './categoryListReducers';
import { message } from 'antd';
// import {}



export function* fetchList(action){
  const {payload, callback} = action;
  
  yield put(actions.setLoading(true))
  const pagination = yield select(state => state.myCategory.data.pagination);
  // const response = yield call(apiGet, `/admin/category`, {page: 1, pageSize: 10});
  const response = yield call(apiGet, `/admin/category`, {});
  console.log(response);
  yield put(actions.setLoading(false))
  const result = parseResList(response, pagination);
  // console.log(result);
  if(result){
    yield put (actions.saveList(result))
  }
}


export default function* rootSaga() {
  // yield takeEvery(actionTypes.FETCH_CATEGORY_LIST, fetchList);
  // yield takeEvery(actionTypes.ADD_OR_UPDATE_CATEGORY, updateCategory);
  yield all([
    takeEvery(actionTypes.FETCH_CATEGORY_LIST, fetchList),
  ])
}



