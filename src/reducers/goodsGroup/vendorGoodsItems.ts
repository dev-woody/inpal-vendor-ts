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
  setSellStatus: {},
  basicUpdate: {},
  dsInfoUpdate: {},
  priceUpdate: {},
  countItem: {},
  pageItem: {},
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
    createRequestSaga("vendorGoodsItems/findById", itemAPI.itemFindById)
  );
  yield takeLatest(
    vendorGoodsItemsActions.setSellStatus,
    createRequestSaga(
      "vendorGoodsItems/setSellStatus",
      itemAPI.itemSetSellStatus
    )
  );
  yield takeLatest(
    vendorGoodsItemsActions.basicUpdate,
    createRequestSaga("vendorGoodsItems/basicUpdate", itemAPI.itemBasicUpdate)
  );
  yield takeLatest(
    vendorGoodsItemsActions.dsInfoUpdate,
    createRequestSaga("vendorGoodsItems/dsInfoUpdate", itemAPI.itemDsInfoUpdate)
  );
  yield takeLatest(
    vendorGoodsItemsActions.priceUpdate,
    createRequestSaga("vendorGoodsItems/priceUpdate", itemAPI.itemPriceUpdate)
  );
  yield takeLatest(
    vendorGoodsItemsActions.countItem,
    createRequestSaga("vendorGoodsItems/countItem", itemAPI.countGoodsItem)
  );
  yield takeLatest(
    vendorGoodsItemsActions.pageItem,
    createRequestSaga("vendorGoodsItems/pageItem", itemAPI.pageGoodsItem)
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
    ...createAsyncReducers({
      actionName: "setSellStatus",
      reducerName: "setSellStatus",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "basicUpdate",
      reducerName: "basicUpdate",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "dsInfoUpdate",
      reducerName: "dsInfoUpdate",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "priceUpdate",
      reducerName: "priceUpdate",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "countItem",
      reducerName: "countItem",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageItem",
      reducerName: "pageItem",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const vendorGoodsItemsActions = vendorGoodsItems.actions;

export default vendorGoodsItems;
