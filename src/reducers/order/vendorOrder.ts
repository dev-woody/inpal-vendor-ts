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
  countDeliveryStatus: {},
  pageDeliveryStatus: {},
  setStatus: {},
  orderLog: {},
  countOrder: {},
  pageOrder: {},
  countOrderStatus: {},
  pageOrderStatus: {},
  countDelivery: {},
  pageDelivery: {},
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
    vendorOrderActions.countDeliveryStatus,
    createRequestSaga(
      "vendorOrder/countDeliveryStatus",
      orderAPI.countDeliveryStatus
    )
  );
  yield takeLatest(
    vendorOrderActions.pageDeliveryStatus,
    createRequestSaga(
      "vendorOrder/pageDeliveryStatus",
      orderAPI.pageDeliveryStatus
    )
  );
  yield takeLatest(
    vendorOrderActions.setStatus,
    createRequestSaga("vendorOrder/setStatus", orderAPI.setStatus)
  );
  yield takeLatest(
    vendorOrderActions.orderLog,
    createRequestSaga("vendorOrder/orderLog", orderAPI.orderLog)
  );
  yield takeLatest(
    vendorOrderActions.countOrder,
    createRequestSaga("vendorOrder/countOrder", orderAPI.countOrder)
  );
  yield takeLatest(
    vendorOrderActions.pageOrder,
    createRequestSaga("vendorOrder/pageOrder", orderAPI.pageOrder)
  );
  yield takeLatest(
    vendorOrderActions.countOrderStatus,
    createRequestSaga("vendorOrder/countOrderStatus", orderAPI.countOrderStatus)
  );
  yield takeLatest(
    vendorOrderActions.pageOrderStatus,
    createRequestSaga("vendorOrder/pageOrderStatus", orderAPI.pageOrderStatus)
  );
  yield takeLatest(
    vendorOrderActions.countDelivery,
    createRequestSaga("vendorOrder/countDelivery", orderAPI.countDelivery)
  );
  yield takeLatest(
    vendorOrderActions.pageDelivery,
    createRequestSaga("vendorOrder/pageDelivery", orderAPI.pageDelivery)
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
      actionName: "countDeliveryStatus",
      reducerName: "countDeliveryStatus",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageDeliveryStatus",
      reducerName: "pageDeliveryStatus",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "orderLog",
      reducerName: "orderLog",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "setStatus",
      reducerName: "setStatus",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "countOrder",
      reducerName: "countOrder",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageOrder",
      reducerName: "pageOrder",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "countOrderStatus",
      reducerName: "countOrderStatus",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageOrderStatus",
      reducerName: "pageOrderStatus",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "countDelivery",
      reducerName: "countDelivery",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageDelivery",
      reducerName: "pageDelivery",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const vendorOrderActions = vendorOrder.actions;

export default vendorOrder;
