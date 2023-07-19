import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* postRegisterSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.optionRegister,
      action.payload.data
    );
    yield put(optionRegisterActions.postRegisterSuccess(response));
  } catch (error) {
    yield put(optionRegisterActions.postRegisterFailure(error));
  }
}

export function* optionRegisterSaga() {
  yield takeLatest(optionRegisterActions.postRegister, postRegisterSaga);
}

//* reducer
const optionRegister = createSlice({
  name: "optionRegister",
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

export const optionRegisterActions = optionRegister.actions;

export default optionRegister;
