import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from './slices/user';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
