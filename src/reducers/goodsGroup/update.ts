import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* postUpdateSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.update,
      action.payload.data
    );
    yield put(goodsGroupUpdateActions.postUpdateSuccess(response));
  } catch (error) {
    yield put(goodsGroupUpdateActions.postUpdateFailure(error));
  }
}

export function* goodsGroupUpdateSaga() {
  yield takeLatest(goodsGroupUpdateActions.postUpdate, postUpdateSaga);
}

//* reducer
const goodsGroupUpdate = createSlice({
  name: "goodsGroupUpdate",
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

export const goodsGroupUpdateActions = goodsGroupUpdate.actions;

export default goodsGroupUpdate;
