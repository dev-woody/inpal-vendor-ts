import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as productAPI from "api/product";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  findAll: {},
  findById: {},
  findManufacturerByProductId: {},
  findAllCategory: {},
  findAllColorCode: {},
  findAllProperty: {},
  findUnitByProductId: {},
};

export function* vendorProductSaga() {
  yield takeLatest(
    vendorProductActions.findAll,
    createRequestSaga("vendorProduct/findAll", productAPI.findAll)
  );
  yield takeLatest(
    vendorProductActions.findById,
    createRequestSaga("vendorProduct/findById", productAPI.findById)
  );
  yield takeLatest(
    vendorProductActions.findManufacturerByProductId,
    createRequestSaga(
      "vendorProduct/findManufacturerByProductId",
      productAPI.findManufacturerByProductId
    )
  );
  yield takeLatest(
    vendorProductActions.findAllCategory,
    createRequestSaga(
      "vendorProduct/findAllCategory",
      productAPI.findAllCategory
    )
  );
  yield takeLatest(
    vendorProductActions.findAllColorCode,
    createRequestSaga(
      "vendorProduct/findAllColorCode",
      productAPI.findAllColorCode
    )
  );
  yield takeLatest(
    vendorProductActions.findAllProperty,
    createRequestSaga(
      "vendorProduct/findAllProperty",
      productAPI.findAllProperty
    )
  );
  yield takeLatest(
    vendorProductActions.findUnitByProductId,
    createRequestSaga(
      "vendorProduct/findUnitByProductId",
      productAPI.findUnitByProductId
    )
  );
}

//* reducer
const vendorProduct = createSlice({
  name: "vendorProduct",
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
      actionName: "findManufacturerByProductId",
      reducerName: "findManufacturerByProductId",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAllCategory",
      reducerName: "findAllCategory",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAllColorCode",
      reducerName: "findAllColorCode",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAllProperty",
      reducerName: "findAllProperty",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findUnitByProductId",
      reducerName: "findUnitByProductId",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const vendorProductActions = vendorProduct.actions;

export default vendorProduct;
