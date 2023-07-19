import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* postRegisterSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.register,
      action.payload.data
    );
    yield put(goodsGroupRegisterActions.postRegisterSuccess(response));
  } catch (error) {
    yield put(goodsGroupRegisterActions.postRegisterFailure(error));
  }
}

export function* goodsGroupRegisterSaga() {
  yield takeLatest(goodsGroupRegisterActions.postRegister, postRegisterSaga);
}

//* reducer
const goodsGroupRegister = createSlice({
  name: "goodsGroupRegister",
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

export const goodsGroupRegisterActions = goodsGroupRegister.actions;

export default goodsGroupRegister;
