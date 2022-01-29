import { all, takeEvery, call, put, select} from "redux-saga/effects";
import { actionTypes, actions } from "@/redux/reducers/comment";
import { apiGet, apiPost, parseResList, parseResSubmit } from "@/services/requestApi";



export function* postComment({payload, callback}) {
    // console.log(payload);


    // const pagination = 

    const response = yield call(apiPost, "/comment", payload);
    // console.log(response);
    const result = parseResSubmit(response);

    if(result){
        if(callback) callback();
    }
}

export function* fetchCommmentList({payload, callback}){

    const {id, ...rest} = payload;
    
    if(payload.page){
        yield put(actions.setPagination({page: payload.page}))
    }

    const pagination = yield select(state => state.myComment.data.pagination);
    const postData = {
        page: payload.page,
        limit: pagination.pageSize,
    }
    if(pagination.total){
        postData.total = pagination.total
    }

    
    
    const response = yield call(apiGet, `/comment/${payload.id}`, postData);

    const result = parseResList(response, pagination);

    if(result){
        yield put(actions.saveList(result));

    }
}


export function* fetchAdminCommmentList({payload, callback}){
    
    console.log(payload)
    if(payload.page){
        yield put(actions.setPagination({page: payload.page}))
    }

    console.log("=====")
    const pagination = yield select(state => state.myComment.data.pagination);
    console.log(pagination)
    const postData = {
        page: payload.page,
        limit: pagination.pageSize,
    }

    if(pagination.total){
        postData.total = pagination.total
    }
    
    const response = yield call(apiGet, `/admin/comments`, postData);

    // const response = yield call(apiPost, `/admin/comment`, postData);
    console.log(response)
    const result = parseResList(response, pagination);
    console.log(result)
    if(result){
        yield put(actions.saveList(result));

    }
}


export function* postAdminComment({payload, callback}) {
    console.log(payload);
    
    const response = yield call(apiPost, "/admin/comment", payload);
    // console.log(response);
    const result = parseResSubmit(response);

    if(result){
        if(callback) callback();
    }
}



export function* deleteComment({payload, callback}) {
    // console.log(payload);
    
    const response = yield call(apiPost, "/admin/comment/delete", payload);
    
    const result = parseResSubmit(response);

    if(result){
        if(callback) callback();
    }
}



export default function* rootSaga(){
    yield all([
        takeEvery(actionTypes.POST_COMMENT, postComment),
        takeEvery(actionTypes.FETCH_HOME_COMMENT_LIST, fetchCommmentList),
        takeEvery(actionTypes.FETCH_COMMENT_LIST, fetchAdminCommmentList),
        takeEvery(actionTypes.POST_COMMENT_ADMIN, postAdminComment),
        takeEvery(actionTypes.DELETE_COMMENT, deleteComment),
    ]);
};