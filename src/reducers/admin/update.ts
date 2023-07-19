import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as adminAPI from "api/admin";

//* saga
function* postUpdateSaga(action: {
  payload: { userId: string; email: string; phone: string };
}) {
  try {
    const response: AxiosResponse = yield call(
      adminAPI.update,
      action.payload.userId,
      action.payload.email,
      action.payload.phone
    );
    yield put(masterUpdateActions.postUpdateSuccess(response));
  } catch (error) {
    yield put(masterUpdateActions.postUpdateFailure(error));
  }
}

export function* masterUpdateSaga() {
  yield takeLatest(masterUpdateActions.postUpdate, postUpdateSaga);
}

//* reducer
const masterUpdate = createSlice({
  name: "masterUpdate",
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

export const masterUpdateActions = masterUpdate.actions;

export default masterUpdate;
