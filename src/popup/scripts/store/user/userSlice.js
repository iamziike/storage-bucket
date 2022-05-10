import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set(state, { payload }) {
      return payload;
    },
  },
});

const userReducer = userSlice.reducer;

export const { set } = userSlice.actions;
export default userReducer;
