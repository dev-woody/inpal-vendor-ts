import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import * as adminAPI from "api/admin";
import { AxiosResponse } from "axios";

//* saga
function* postCheckPasswordSaga(action: {
  payload: { userId: string; password: string };
}) {
  try {
    const response: AxiosResponse = yield call(
      adminAPI.checkPassword,
      action.payload.userId,
      action.payload.password
    );
    yield put(checkPasswordActions.postCheckPasswordSuccess(response));
  } catch (error) {
    yield put(checkPasswordActions.postCheckPasswordFailure(error));
  }
}

export function* checkPasswordSaga() {
  yield takeLatest(
    checkPasswordActions.postCheckPassword,
    postCheckPasswordSaga
  );
}

const checkPassword = createSlice({
  name: "checkPassword",
  initialState: responseForm,
  reducers: {
    postCheckPassword(state, action) {
      state.message = responseForm.message;
    },
    postCheckPasswordSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    postCheckPasswordFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const checkPasswordActions = checkPassword.actions;

export default checkPassword;
