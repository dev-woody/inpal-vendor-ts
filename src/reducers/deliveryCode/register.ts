import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as deliveryAPI from "api/deliveryCode";

//* saga
function* postRegisterSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      deliveryAPI.register,
      action.payload.data
    );
    yield put(deliveryRegisterActions.postRegisterSuccess(response));
  } catch (error) {
    yield put(deliveryRegisterActions.postRegisterFailure(error));
  }
}

export function* deliveryRegisterSaga() {
  yield takeLatest(deliveryRegisterActions.postRegister, postRegisterSaga);
}

//* reducer
const deliveryRegister = createSlice({
  name: "deliveryRegister",
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

export const deliveryRegisterActions = deliveryRegister.actions;

export default deliveryRegister;
