import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* postUpdateSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.optionUpdate,
      action.payload.data
    );
    yield put(optionUpdateActions.postUpdateSuccess(response));
  } catch (error) {
    yield put(optionUpdateActions.postUpdateFailure(error));
  }
}

export function* optionUpdateSaga() {
  yield takeLatest(optionUpdateActions.postUpdate, postUpdateSaga);
}

//* reducer
const optionUpdate = createSlice({
  name: "optionUpdate",
  initialState: responseForm,
  reducers: {
    postUpdate(state, action) {
      state.message = responseForm.message;
    },
    postUpdateSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    postUpdateFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const optionUpdateActions = optionUpdate.actions;

export default optionUpdate;
