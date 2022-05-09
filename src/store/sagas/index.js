import  {takeLatest, takeEvery} from 'redux-saga/effects'
import {handleAddTextBlock, handleGetTextBlocks, handleUpdateTextBlock} from "./handlers/textBlocks";
import {ADD_TEXT_BLOCK, GET_TEXT_BLOCKS, UPDATE_TEXT_BLOCK} from './../reducers/textBlocksReducer'


export function* watcherSaga() {
    yield takeLatest(ADD_TEXT_BLOCK, handleAddTextBlock)
    yield takeLatest(GET_TEXT_BLOCKS, handleGetTextBlocks)
    yield takeEvery(UPDATE_TEXT_BLOCK, handleUpdateTextBlock )

}

export default function* rootSaga() {
    yield watcherSaga();
}