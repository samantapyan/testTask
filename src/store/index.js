import {createStore, applyMiddleware} from "redux";
import {rootReducer} from "./reducers/rootReducer";
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import { logger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(rootSaga)