
import {put, call, delay, takeLatest, takeEvery, select} from 'redux-saga/effects';
import { apiGet, apiDelete, apiPost, apiDelete2, parseResDetail, parseResList } from '@/services/requestApi';

import { actionTypes, actions} from '../reducers/tag';
// import {}


export function* LogIn () {
  yield delay(3000);
  return 1;
}

export function* fetchList(action){
  const {payload, callback} = action;
  console.log("===========fetch tags")
  // console.log(action)
  const pagination = yield select(state=> state.myTag.data.pagination);
  const response = yield call(apiGet, `/admin/tags`, {});
  console.log(response)
  const result = parseResList(response, pagination);
  console.log(result)
  if(result){
    yield put(actions.saveList(result))
    if(callback) callback(response);
  }
  
  // yield put(setLogInStatus(response))
}


export default function* rootSaga() {
  yield takeEvery(actionTypes.FETCH_TAG_LIST, fetchList)
}



