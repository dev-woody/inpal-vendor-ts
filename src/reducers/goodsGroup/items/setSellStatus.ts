import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* getSetSellStatusSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.itemSetSellStatus,
      action.payload.data
    );
    yield put(itemSetSellStatusActions.getSetSellStatusSuccess(response));
  } catch (error) {
    yield put(itemSetSellStatusActions.getSetSellStatusFailure(error));
  }
}

export function* itemSetSellStatusSaga() {
  yield takeLatest(
    itemSetSellStatusActions.getSetSellStatus,
    getSetSellStatusSaga
  );
}

//* reducer
const itemSetSellStatus = createSlice({
  name: "itemSetSellStatus",
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

export const itemSetSellStatusActions = itemSetSellStatus.actions;

export default itemSetSellStatus;
