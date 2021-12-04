import {createStore, compose, applyMiddleware} from "redux";
import reducer from "./reducer";
// import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { routerMiddleware } from "connected-react-router";
import history from "@/utils/history";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history))));

sagaMiddleware.run(rootSaga);


export default store;