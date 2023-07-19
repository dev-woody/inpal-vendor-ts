import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as imageAPI from "api/image";

//* saga
function* postUploadSaga(action: { payload: { formData: FormData } }) {
  try {
    const response: AxiosResponse = yield call(
      imageAPI.uploadImg,
      action.payload.formData
    );
    yield put(uploadImgActions.postUploadSuccess(response));
  } catch (error) {
    yield put(uploadImgActions.postUploadFailure(error));
  }
}

export function* uploadImgSaga() {
  yield takeLatest(uploadImgActions.postUpload, postUploadSaga);
}

//* reducer
const uploadImg = createSlice({
  name: "uploadImg",
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

export const uploadImgActions = uploadImg.actions;

export default uploadImg;
