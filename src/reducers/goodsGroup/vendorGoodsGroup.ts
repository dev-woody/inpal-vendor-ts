import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as goodsGroupAPI from "api/goodsGroup";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  register: {},
  basicUpdate: {},
  detailUpdate: {},
  goodsImageUpdate: {},
  findAll: {},
  findById: {},
  setOpenStatus: {},
};

export function* vendorGoodsGroupSaga() {
  yield takeLatest(
    vendorGoodsGroupActions.register,
    createRequestSaga("vendorGoodsGroup/register", goodsGroupAPI.register)
  );
  yield takeLatest(
    vendorGoodsGroupActions.basicUpdate,
    createRequestSaga("vendorGoodsGroup/basicUpdate", goodsGroupAPI.basicUpdate)
  );
  yield takeLatest(
    vendorGoodsGroupActions.detailUpdate,
    createRequestSaga(
      "vendorGoodsGroup/detailUpdate",
      goodsGroupAPI.detailUpdate
    )
  );
  yield takeLatest(
    vendorGoodsGroupActions.goodsImageUpdate,
    createRequestSaga(
      "vendorGoodsGroup/goodsImageUpdate",
      goodsGroupAPI.goodsImageUpdate
    )
  );
  yield takeLatest(
    vendorGoodsGroupActions.findAll,
    createRequestSaga("vendorGoodsGroup/findAll", goodsGroupAPI.findAll)
  );
  yield takeLatest(
    vendorGoodsGroupActions.findById,
    createRequestSaga("vendorGoodsGroup/findById", goodsGroupAPI.findById)
  );
  yield takeLatest(
    vendorGoodsGroupActions.setOpenStatus,
    createRequestSaga(
      "vendorGoodsGroup/setOpenStatus",
      goodsGroupAPI.setOpenStatus
    )
  );
}

//* reducer
const vendorGoodsGroup = createSlice({
  name: "vendorGoodsGroup",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "register",
      reducerName: "register",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "basicUpdate",
      reducerName: "basicUpdate",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "detailUpdate",
      reducerName: "detailUpdate",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "goodsImageUpdate",
      reducerName: "goodsImageUpdate",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAll",
      reducerName: "findAll",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findById",
      reducerName: "findById",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "setOpenStatus",
      reducerName: "setOpenStatus",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const vendorGoodsGroupActions = vendorGoodsGroup.actions;

export default vendorGoodsGroup;
