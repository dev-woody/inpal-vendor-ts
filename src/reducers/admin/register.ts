import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as adminAPI from "api/admin";

//* saga
function* postRegisterSaga(action: { payload: { data: any } }) {
  try {
    const response: AxiosResponse = yield call(
      adminAPI.vendorRegister,
      action.payload.data
    );
    yield put(registerActions.postRegisterSuccess(response));
  } catch (error) {
    yield put(registerActions.postRegisterFailure(error));
  }
}

export function* registerSaga() {
  yield takeLatest(registerActions.postRegister, postRegisterSaga);
}

//* reducer
const register = createSlice({
  name: "register",
  initialState: responseForm,
  reducers: {
    postRegister(state, action) {
      state.message = responseForm.message;
    },
    postRegisterSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    postRegisterFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const registerActions = register.actions;

export default register;
