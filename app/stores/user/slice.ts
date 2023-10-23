import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User, UserState} from '../../types/user';

const initialState: UserState = {
  token: 'asd',
  activeUser: null,
  users: [],
  totalPages: 0,
  loading: false,
  refreshing: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setActiveUser: (state, action: PayloadAction<Partial<User> | null>) => {
      state.activeUser = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      if (!action.payload.length) {
        state.users = [];
        return;
      }

      state.users = [...state.users, ...action.payload];
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.refreshing = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchUsers: (state, action: PayloadAction<number>) => {},
  },
});

export const {
  setToken,
  setActiveUser,
  setUsers,
  setTotalPages,
  setLoading,
  setRefreshing,
  setError,
  fetchUsers,
} = userSlice.actions;

export default userSlice.reducer;
