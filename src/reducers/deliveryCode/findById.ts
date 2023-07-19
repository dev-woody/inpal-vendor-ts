import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as deliveryAPI from "api/deliveryCode";

//* saga
function* getFindByIdSaga(action: { payload: { id: string } }) {
  try {
    const response: AxiosResponse = yield call(
      deliveryAPI.findById,
      action.payload.id
    );
    yield put(deliveryFindByIdActions.getFindByIdSuccess(response));
  } catch (error) {
    yield put(deliveryFindByIdActions.getFindByIdFailure(error));
  }
}

export function* deliveryFindByIdSaga() {
  yield takeLatest(deliveryFindByIdActions.getFindById, getFindByIdSaga);
}

//* reducer
const deliveryFindById = createSlice({
  name: "deliveryFindById",
  initialState: responseForm,
  reducers: {
    getFindById(state, action) {
      state.message = responseForm.message;
    },
    getFindByIdSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getFindByIdFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const deliveryFindByIdActions = deliveryFindById.actions;

export default deliveryFindById;
