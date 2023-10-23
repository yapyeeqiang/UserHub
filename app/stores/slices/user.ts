import {createSlice} from '@reduxjs/toolkit';
import {UserState} from '../../types/user';

const initialState: UserState = {
  token: null,
  activeUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
  },
});

export const {updateToken, updateActiveUser} = userSlice.actions;

export default userSlice.reducer;
