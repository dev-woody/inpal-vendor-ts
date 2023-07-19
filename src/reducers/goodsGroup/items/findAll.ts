import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* getFindAllSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.itemFindByGroupId,
      action.payload.data
    );
    yield put(itemsFindAllActions.getFindAllSuccess(response));
  } catch (error) {
    yield put(itemsFindAllActions.getFindAllFailure(error));
  }
}

export function* itemsFindAllSaga() {
  yield takeLatest(itemsFindAllActions.getFindAll, getFindAllSaga);
}

//* reducer
const itemsFindAll = createSlice({
  name: "itemsFindAll",
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

export const itemsFindAllActions = itemsFindAll.actions;

export default itemsFindAll;
