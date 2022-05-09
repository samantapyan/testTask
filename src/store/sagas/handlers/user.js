import {call, put} from 'redux-saga/effects'
import {requestGetUser} from './../requests/user'
import { setUser } from './../../reducers/userReducer'

export function* handleGetUser(action) {
    try {
        const {data} = action
        const response = yield call(requestGetUser(data))
        const user = response
        yield put(setUser(user))
    }
    catch (e) {}
}