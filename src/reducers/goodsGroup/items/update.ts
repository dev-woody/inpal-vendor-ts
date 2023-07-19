import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* postUpdateSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.itemUpdate,
      action.payload.data
    );
    yield put(itemUpdateActions.postUpdateSuccess(response));
  } catch (error) {
    yield put(itemUpdateActions.postUpdateFailure(error));
  }
}

export function* itemUpdateSaga() {
  yield takeLatest(itemUpdateActions.postUpdate, postUpdateSaga);
}

//* reducer
const itemUpdate = createSlice({
  name: "itemUpdate",
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

export const itemUpdateActions = itemUpdate.actions;

export default itemUpdate;
