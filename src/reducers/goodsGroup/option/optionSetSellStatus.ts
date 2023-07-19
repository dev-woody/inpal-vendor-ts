import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* getSetSellStatusSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.optionSellStatus,
      action.payload.data
    );
    yield put(optionSetSellStatusActions.getSetSellStatusSuccess(response));
  } catch (error) {
    yield put(optionSetSellStatusActions.getSetSellStatusFailure(error));
  }
}

export function* optionSetSellStatusSaga() {
  yield takeLatest(
    optionSetSellStatusActions.getSetSellStatus,
    getSetSellStatusSaga
  );
}

//* reducer
const optionSetSellStatus = createSlice({
  name: "optionSetSellStatus",
  initialState: responseForm,
  reducers: {
    getSetSellStatus(state, action) {
      state.message = responseForm.message;
    },
    getSetSellStatusSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getSetSellStatusFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const optionSetSellStatusActions = optionSetSellStatus.actions;

export default optionSetSellStatus;
