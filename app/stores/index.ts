import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from './user/slice';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import userSaga from './user/saga';

const rootReducer = combineReducers({
  user: userReducer,
});

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([userSaga()]);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
