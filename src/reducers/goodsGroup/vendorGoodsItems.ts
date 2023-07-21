import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as itemAPI from "api/goodsGroup";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  register: {},
  findByGoodsGroupId: {},
  findById: {},
};

export function* vendorGoodsItemsSaga() {
  yield takeLatest(
    vendorGoodsItemsActions.register,
    createRequestSaga("vendorGoodsItems/register", itemAPI.itemRegister)
  );
  yield takeLatest(
    vendorGoodsItemsActions.findByGoodsGroupId,
    createRequestSaga(
      "vendorGoodsItems/findByGoodsGroupId",
      itemAPI.itemFindByGroupId
    )
  );
  yield takeLatest(
    vendorGoodsItemsActions.findById,
    createRequestSaga("vendorGoodsItems/findById", itemAPI.findById)
  );
}

//* reducer
const vendorGoodsItems = createSlice({
  name: "vendorGoodsItems",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "register",
      reducerName: "register",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findByGoodsGroupId",
      reducerName: "findByGoodsGroupId",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findById",
      reducerName: "findById",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const vendorGoodsItemsActions = vendorGoodsItems.actions;

export default vendorGoodsItems;
