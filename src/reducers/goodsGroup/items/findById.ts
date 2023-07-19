import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodsGroupAPI from "api/goodsGroup";

//* saga
function* getFindByIdSaga(action: { payload: { id: string } }) {
  try {
    const response: AxiosResponse = yield call(
      goodsGroupAPI.itemFindById,
      action.payload.id
    );
    yield put(itemFindByIdActions.getFindByIdSuccess(response));
  } catch (error) {
    yield put(itemFindByIdActions.getFindByIdFailure(error));
  }
}

export function* itemFindByIdSaga() {
  yield takeLatest(itemFindByIdActions.getFindById, getFindByIdSaga);
}

//* reducer
const itemFindById = createSlice({
  name: "itemFindById",
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

export const itemFindByIdActions = itemFindById.actions;

export default itemFindById;
