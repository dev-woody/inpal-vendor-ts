import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as deliveryAPI from "api/deliveryCode";

//* saga
function* postUpdateSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      deliveryAPI.update,
      action.payload.data
    );
    yield put(deliveryUpdateActions.postUpdateSuccess(response));
  } catch (error) {
    yield put(deliveryUpdateActions.postUpdateFailure(error));
  }
}

export function* deliveryUpdateSaga() {
  yield takeLatest(deliveryUpdateActions.postUpdate, postUpdateSaga);
}

//* reducer
const deliveryUpdate = createSlice({
  name: "deliveryUpdate",
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

export const deliveryUpdateActions = deliveryUpdate.actions;

export default deliveryUpdate;
