import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* postRegisterSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.itemRegister,
      action.payload.data
    );
    yield put(itemRegisterActions.postRegisterSuccess(response));
  } catch (error) {
    yield put(itemRegisterActions.postRegisterFailure(error));
  }
}

export function* itemRegisterSaga() {
  yield takeLatest(itemRegisterActions.postRegister, postRegisterSaga);
}

//* reducer
const itemRegister = createSlice({
  name: "itemRegister",
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

export const itemRegisterActions = itemRegister.actions;

export default itemRegister;
