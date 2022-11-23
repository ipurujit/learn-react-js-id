import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
  },
  reducers: {
    setUser(state, action) {
      console.log(action.payload, 'action');
      if (action.payload) {
        // eslint-disable-next-line no-param-reassign
        state.data = action.payload;
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state) => state.user.data;

export default userSlice.reducer;
