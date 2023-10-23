import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  setError,
  setLoading,
  setRefreshing,
  setTotalPages,
  setUsers,
} from './slice';
import {getUsers} from '../../api/user';

function* fetchUsersSaga(
  action: PayloadAction<number>,
): Generator<any, void, any> {
  try {
    yield put(setLoading(true));

    const response = yield call(getUsers, action.payload);

    if (!response) {
      yield put(setError('Failed to fetch users'));
      return;
    }

    yield put(setTotalPages(response.totalPages));
    yield put(setUsers(response.users));

    yield put(setError(null));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setError(error.message));
    } else {
      yield put(setError('An unknown error occured'));
    }
  } finally {
    yield put(setLoading(false));
    yield put(setRefreshing(false));
  }
}

function* userSaga() {
  yield takeLatest('user/fetchUsers', fetchUsersSaga);
}

export default userSaga;
