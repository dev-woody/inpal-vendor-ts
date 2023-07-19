import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* postUploadSaga(action: { payload: { formData: FormData } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.uploadImage,
      action.payload.formData
    );
    yield put(goodsGroupImageActions.postUploadSuccess(response));
  } catch (error) {
    yield put(goodsGroupImageActions.postUploadFailure(error));
  }
}

export function* goodsGroupImageSaga() {
  yield takeLatest(goodsGroupImageActions.postUpload, postUploadSaga);
}

//* reducer
const goodsGroupImage = createSlice({
  name: "goodsGroupImage",
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

export const goodsGroupImageActions = goodsGroupImage.actions;

export default goodsGroupImage;
