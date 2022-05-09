import {call, put} from 'redux-saga/effects'
import {requestAddTextBlock, requestGetTextBlock, requestUpdatTextBlock} from './../requests/textBlocks'
import { addTextBlock,updateTextBlocksSuccessed, addTextBlockSuccessed, getTextBlocksSuccessed } from './../../reducers/textBlocksReducer'

export function* handleAddTextBlock(action) {
    try {
        const {textBlockData} = action
        const response = yield call(requestAddTextBlock,textBlockData)
        yield put(addTextBlockSuccessed({id:response.id, ...textBlockData}))
    }
    catch (e) {}
}


export function* handleGetTextBlocks() {
    try {
       const response = yield call(requestGetTextBlock)
        let result = []
        response.forEach((doc) => {
            result.push({id:doc.id, ...doc.data()})
        });
        yield put(getTextBlocksSuccessed(result))
    }
    catch (e) {}
}

export function* handleUpdateTextBlock(action) {
    try {
        const {textBlockData} = action
        const response = yield call(requestUpdatTextBlock,textBlockData )
        let result = []
        yield put(updateTextBlocksSuccessed(textBlockData))
    }
    catch (e) {}
}