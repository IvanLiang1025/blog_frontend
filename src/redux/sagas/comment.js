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

    
    
    const response = yield call(apiGet, `/comment/${payload.id}`, postData);

    const result = parseResList(response, pagination);

    if(result){
        // console.log(formatCommentList(result.list));
        // console.log(result.list)
        yield put(actions.saveList(result));

    }
    // console.log(response);
}

function treeToList (tree, result = [], level = 0) {
    tree.forEach(node => {
      result.push(node)
      node.replyComments && treeToList(node.replyComments, result)
    })
    return result
  }

const formatCommentList = (treeList) => {
    console.log(treeList)
    for(let node of treeList){
        if(node.replyComments) {
            node.replyComments = treeToList(node.replyComments)
        }
    }
    return treeList;
    // console.log(treeList);
}

const getReplyComments = (commentTree) => {
    const arr = [];
    console.log(commentTree)

    for(let comment of commentTree) {

        if(Array.isArray(comment.replyComments) ){

            if(comment.replyComments.length > 0){

                arr.concat(getReplyComments(comment.replyComments))
            }
        }
    }
    return arr;
}




export default function* rootSaga(){
    yield all([
        takeEvery(actionTypes.POST_COMMENT, postComment),
        takeEvery(actionTypes.FETCH_COMMENT_LIST, fetchCommmentList)
    ]);
};