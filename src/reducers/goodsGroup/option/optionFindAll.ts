import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* getFindAllSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.optionFindByGroupId,
      action.payload.data
    );
    yield put(optionFindAllActions.getFindAllSuccess(response));
  } catch (error) {
    yield put(optionFindAllActions.getFindAllFailure(error));
  }
}

export function* optionFindAllSaga() {
  yield takeLatest(optionFindAllActions.getFindAll, getFindAllSaga);
}

//* reducer
const optionFindAll = createSlice({
  name: "optionFindAll",
  initialState: responseForm,
  reducers: {
    getFindAll(state, action) {
      state.message = responseForm.message;
    },
    getFindAllSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getFindAllFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const optionFindAllActions = optionFindAll.actions;

export default optionFindAll;
