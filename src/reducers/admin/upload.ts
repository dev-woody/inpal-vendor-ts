import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as adminAPI from "api/admin";

//* saga
function* postUploadSaga(action: { payload: { formData: FormData } }) {
  try {
    const response: AxiosResponse = yield call(
      adminAPI.signInUpload,
      action.payload.formData
    );
    yield put(signInUploadActions.postUploadSuccess(response));
  } catch (error) {
    yield put(signInUploadActions.postUploadFailure(error));
  }
}

export function* signInUploadSaga() {
  yield takeLatest(signInUploadActions.postUpload, postUploadSaga);
}

//* reducer
const signInUpload = createSlice({
  name: "signInUpload",
  initialState: responseForm,
  reducers: {
    postUpload(state, action) {
      state.message = responseForm.message;
    },
    postUploadSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    postUploadFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const signInUploadActions = signInUpload.actions;

export default signInUpload;
