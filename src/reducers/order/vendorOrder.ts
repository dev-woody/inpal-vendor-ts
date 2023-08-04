import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as orderAPI from "api/order";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  findAll: {},
  findById: {},
  itemFindAll: {},
  itemFindById: {},
  findByDelivery: {},
  deliveryFindById: {},
  setStatus: {},
  orderLog: {},
};

export function* vendorOrderSaga() {
  yield takeLatest(
    vendorOrderActions.findAll,
    createRequestSaga("vendorOrder/findAll", orderAPI.findAll)
  );
  yield takeLatest(
    vendorOrderActions.findById,
    createRequestSaga("vendorOrder/findById", orderAPI.findById)
  );
  yield takeLatest(
    vendorOrderActions.itemFindAll,
    createRequestSaga("vendorOrder/itemFindAll", orderAPI.itemFindAll)
  );
  yield takeLatest(
    vendorOrderActions.itemFindById,
    createRequestSaga("vendorOrder/itemFindById", orderAPI.itemFindById)
  );
  yield takeLatest(
    vendorOrderActions.findByDelivery,
    createRequestSaga("vendorOrder/findByDelivery", orderAPI.findByDelivery)
  );
  yield takeLatest(
    vendorOrderActions.deliveryFindById,
    createRequestSaga("vendorOrder/deliveryFindById", orderAPI.deliveryFindById)
  );
  yield takeLatest(
    vendorOrderActions.setStatus,
    createRequestSaga("vendorOrder/setStatus", orderAPI.setStatus)
  );
  yield takeLatest(
    vendorOrderActions.orderLog,
    createRequestSaga("vendorOrder/orderLog", orderAPI.orderLog)
  );
}

//* reducer
const vendorOrder = createSlice({
  name: "vendorOrder",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "findAll",
      reducerName: "findAll",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findById",
      reducerName: "findById",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "itemFindAll",
      reducerName: "itemFindAll",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "itemFindById",
      reducerName: "itemFindById",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findByDelivery",
      reducerName: "findByDelivery",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "deliveryFindById",
      reducerName: "deliveryFindById",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "orderLog",
      reducerName: "orderLog",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "setStatus",
      reducerName: "setStatus",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const vendorOrderActions = vendorOrder.actions;

export default vendorOrder;
