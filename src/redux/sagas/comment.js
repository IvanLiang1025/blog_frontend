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
    console.log(rest);

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
    console.log(postData)
    
    
    const response = yield call(apiGet, `/comment/${payload.id}`, postData);

    const result = parseResList(response, pagination);

    if(result){
        yield put(actions.saveList(result));
    }
    // console.log(response);
}




export default function* rootSaga(){
    yield all([
        takeEvery(actionTypes.POST_COMMENT, postComment),
        takeEvery(actionTypes.FETCH_COMMENT_LIST, fetchCommmentList)
    ]);
};