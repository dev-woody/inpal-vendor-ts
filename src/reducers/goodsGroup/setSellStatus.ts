import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* getgroupSetSellStatusSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.groupSetSellStatus,
      action.payload.data
    );
    yield put(groupSetSellStatusActions.getgroupSetSellStatusSuccess(response));
  } catch (error) {
    yield put(groupSetSellStatusActions.getgroupSetSellStatusFailure(error));
  }
}

export function* groupSetSellStatusSaga() {
  yield takeLatest(
    groupSetSellStatusActions.getgroupSetSellStatus,
    getgroupSetSellStatusSaga
  );
}

//* reducer
const groupSetSellStatus = createSlice({
  name: "groupSetSellStatus",
  initialState: responseForm,
  reducers: {
    getgroupSetSellStatus(state, action) {
      state.message = responseForm.message;
    },
    getgroupSetSellStatusSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getgroupSetSellStatusFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const groupSetSellStatusActions = groupSetSellStatus.actions;

export default groupSetSellStatus;
