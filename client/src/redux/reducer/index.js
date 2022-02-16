import {combineReducers} from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers(
    {
        authReducer,postReducer,userReducer
    }
);
export default rootReducer;