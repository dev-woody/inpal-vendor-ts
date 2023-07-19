import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* postUploadSaga(action: { payload: { formData: FormData } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.detailPage,
      action.payload.formData
    );
    yield put(detailPageActions.postUploadSuccess(response));
  } catch (error) {
    yield put(detailPageActions.postUploadFailure(error));
  }
}

export function* detailPageSaga() {
  yield takeLatest(detailPageActions.postUpload, postUploadSaga);
}

//* reducer
const detailPage = createSlice({
  name: "detailPage",
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

export const detailPageActions = detailPage.actions;

export default detailPage;
