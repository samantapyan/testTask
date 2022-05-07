import {combineReducers} from "redux";
import {textBlocksReducer} from "./textBlocksReducer";
import {userReducer} from "./userReducer";


export const rootReducer = combineReducers({
    textBlocks: textBlocksReducer,
    user:userReducer
})