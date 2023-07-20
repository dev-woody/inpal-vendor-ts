import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as deliveryCodeAPI from "api/deliveryCode";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  register: {},
  update: {},
  findAll: {},
  findById: {},
  findAllByProductId: {},
};

export function* vendorDeliveryCodeSaga() {
  yield takeLatest(
    vendorDeliveryCodeActions.findAll,
    createRequestSaga("vendorDeliveryCode/findAll", deliveryCodeAPI.findAll)
  );
  yield takeLatest(
    vendorDeliveryCodeActions.register,
    createRequestSaga("vendorDeliveryCode/register", deliveryCodeAPI.register)
  );
  yield takeLatest(
    vendorDeliveryCodeActions.update,
    createRequestSaga("vendorDeliveryCode/update", deliveryCodeAPI.update)
  );
  yield takeLatest(
    vendorDeliveryCodeActions.findById,
    createRequestSaga("vendorDeliveryCode/findById", deliveryCodeAPI.findById)
  );
  yield takeLatest(
    vendorDeliveryCodeActions.findAllByProductId,
    createRequestSaga(
      "vendorDeliveryCode/findAllByProductId",
      deliveryCodeAPI.findAllByProductId
    )
  );
}

//* reducer
const vendorDeliveryCode = createSlice({
  name: "vendorDeliveryCode",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "register",
      reducerName: "register",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "update",
      reducerName: "update",
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
      actionName: "findAllByProductId",
      reducerName: "findAllByProductId",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const vendorDeliveryCodeActions = vendorDeliveryCode.actions;

export default vendorDeliveryCode;
