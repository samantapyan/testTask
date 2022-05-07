import  {takeLatest} from 'redux-saga/effects'
import {handleGetUser} from "./handlers/user";
import {GET_USER} from './../reducers/userReducer'

export function* workerSaga() {

}

export function* watcherSaga() {
    // yield takeLatest(GET_USER, handleGetUser)
    console.log("click saga!")
}

export default function* rootSaga() {
    yield watcherSaga();
}