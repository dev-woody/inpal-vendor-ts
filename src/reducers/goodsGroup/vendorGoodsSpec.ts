import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as specAPI from "api/spec";
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

export function* vendorGoodsSpecSaga() {
  yield takeLatest(
    vendorGoodsSpecActions.register,
    createRequestSaga("vendorGoodsSpec/register", specAPI.register)
  );
  yield takeLatest(
    vendorGoodsSpecActions.update,
    createRequestSaga("vendorGoodsSpec/update", specAPI.update)
  );
  yield takeLatest(
    vendorGoodsSpecActions.findAll,
    createRequestSaga("vendorGoodsSpec/findAll", specAPI.findAll)
  );
  yield takeLatest(
    vendorGoodsSpecActions.findById,
    createRequestSaga("vendorGoodsSpec/findById", specAPI.findById)
  );
  yield takeLatest(
    vendorGoodsSpecActions.findAllByProductId,
    createRequestSaga(
      "vendorGoodsSpec/findAllByProductId",
      specAPI.findAllByProductId
    )
  );
}

//* reducer
const vendorGoodsSpec = createSlice({
  name: "vendorGoodsSpec",
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

export const vendorGoodsSpecActions = vendorGoodsSpec.actions;

export default vendorGoodsSpec;
