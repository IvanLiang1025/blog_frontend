import {  apiPost, parseResSubmit } from "@/services/requestApi";
import { all, call, put, takeEvery} from "redux-saga/effects";
import { actionTypes, actions } from "../reducers/login";
import { push } from "connected-react-router";
import { setLoginAuth } from "@/services/authorize";


export function* login(action){

    const {payload} = action;
    // console.log("====login saga");
    // console.log(action);
    const response = yield call(apiPost, '/login', payload);
    
    const result = parseResSubmit(response);

    if(result){
        yield put(actions.setStatus(true));

        setLoginAuth(result.accessToken);
        yield put(push("/admin/blog"))
    }

}


export default function* rootSaga(){
    yield all([
        takeEvery(actionTypes.LOG_IN, login)
    ])
}