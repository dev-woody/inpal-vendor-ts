import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as deliveryAPI from "api/deliveryCode";

//* saga
function* getFindAllSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      deliveryAPI.findAll,
      action.payload.data
    );
    yield put(deliveryFindAllActions.getFindAllSuccess(response));
  } catch (error) {
    yield put(deliveryFindAllActions.getFindAllFailure(error));
  }
}

export function* deliveryFindAllSaga() {
  yield takeLatest(deliveryFindAllActions.getFindAll, getFindAllSaga);
}

//* reducer
const deliveryFindAll = createSlice({
  name: "deliveryFindAll",
  initialState: responseForm,
  reducers: {
    getFindAll(state, action) {
      state.message = responseForm.message;
    },
    getFindAllSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getFindAllFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const deliveryFindAllActions = deliveryFindAll.actions;

export default deliveryFindAll;
