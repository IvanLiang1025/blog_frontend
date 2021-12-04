import { all, call } from 'redux-saga/effects';
import loginSaga from '@/redux/sagas/login';
import tagSaga from '@/redux/sagas/tag';
import categorySaga from '@/redux/sagas/category';
import blogSaga from '@/redux/sagas/blog';
import commentSage from "@/redux/sagas/comment";

// import gloablSaga from '@'

export default function* rootSaga() {
  yield all([
    call(loginSaga),
    call(tagSaga),
    call(categorySaga),
    call(blogSaga),
    call(commentSage),
    // loginSaga()
  ]);
}