import { combineReducers } from "redux";

import AuthReducer from "./authReducer";
import postReducer from "./postReducer";

export const reducers = combineReducers({AuthReducer, postReducer})