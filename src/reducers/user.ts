import { createSlice } from "@reduxjs/toolkit";

//* reducer
const user = createSlice({
  name: "user",
  initialState: {
    vendorId: "",
    userId: "",
    name: "",
    token: "",
    refreshToken: "",
    loginAt: "",
    topLevel: false,
  },
  reducers: {
    saveUser(state, action) {
      state.vendorId = action.payload.vendorId;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.loginAt = action.payload.loginAt;
      state.topLevel = action.payload.topLevel;
    },
    reset(state, action) {
      Object.assign(state, {
        userId: "",
        name: "",
        token: "",
        refreshToken: "",
        loginAt: "",
        topLevel: false,
      });
    },
  },
});

export const userActions = user.actions;

export default user;
