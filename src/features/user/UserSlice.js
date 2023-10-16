import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user.push(action.payload);
    },
    clearUser: (state) => {
      state.user = [];
    },
  },
});

export const { addUser, clearUser } = UserSlice.actions;

export default UserSlice.reducer;
