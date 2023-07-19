import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as adminAPI from "api/admin";

//* saga
function* getFindAllSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      adminAPI.findAllUnit,
      action.payload.data
    );
    yield put(findAllUnitActions.getFindAllSuccess(response));
  } catch (error) {
    yield put(findAllUnitActions.getFindAllFailure(error));
  }
}

export function* findAllUnitSaga() {
  yield takeLatest(findAllUnitActions.getFindAll, getFindAllSaga);
}

//* reducer
const findAllUnit = createSlice({
  name: "findAllUnit",
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

export const findAllUnitActions = findAllUnit.actions;

export default findAllUnit;
