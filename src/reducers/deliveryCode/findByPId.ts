import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as deliveryAPI from "api/deliveryCode";

//* saga
function* getFindByPIdSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      deliveryAPI.findByPId,
      action.payload.data
    );
    yield put(deliveryFindByPIdActions.getFindByPIdSuccess(response));
  } catch (error) {
    yield put(deliveryFindByPIdActions.getFindByPIdFailure(error));
  }
}

export function* deliveryFindByPIdSaga() {
  yield takeLatest(deliveryFindByPIdActions.getFindByPId, getFindByPIdSaga);
}

//* reducer
const deliveryFindByPId = createSlice({
  name: "deliveryFindByPId",
  initialState: responseForm,
  reducers: {
    getFindByPId(state, action) {
      state.message = responseForm.message;
    },
    getFindByPIdSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getFindByPIdFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const deliveryFindByPIdActions = deliveryFindByPId.actions;

export default deliveryFindByPId;
