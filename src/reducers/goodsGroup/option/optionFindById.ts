import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* getFindByIdSaga(action: { payload: { id: string } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.optionFindById,
      action.payload.id
    );
    yield put(optionFindByIdActions.getFindByIdSuccess(response));
  } catch (error) {
    yield put(optionFindByIdActions.getFindByIdFailure(error));
  }
}

export function* optionFindByIdSaga() {
  yield takeLatest(optionFindByIdActions.getFindById, getFindByIdSaga);
}

//* reducer
const optionFindById = createSlice({
  name: "optionFindById",
  initialState: responseForm,
  reducers: {
    getFindById(state, action) {
      state.message = responseForm.message;
    },
    getFindByIdSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getFindByIdFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const optionFindByIdActions = optionFindById.actions;

export default optionFindById;
