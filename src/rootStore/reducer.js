

import { combineReducers} from "redux";
import loginReducer from "@/redux/reducers/login";
import tagReducer from '@/redux/reducers/tag';
import categoryReducer from '@/redux/reducers/category';
import blogReducer from '@/redux/reducers/blog';
import commentReducer from '@/redux/reducers/comment';
import history from "@/utils/history";
import { connectRouter } from "connected-react-router";

const reducer = combineReducers({
    router: connectRouter(history),
     logIn: loginReducer,
     myTag: tagReducer,
     myCategory: categoryReducer,
     myBlog: blogReducer,
     myComment: commentReducer,
})

export default reducer;