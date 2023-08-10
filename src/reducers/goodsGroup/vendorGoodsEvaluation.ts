import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as goodsEvaluationAPI from "api/evaluation";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  findById: {},
  findByGoodItemId: {},
};

export function* vendorGoodsEvaluationSaga() {
  yield takeLatest(
    vendorGoodsEvaluationActions.findById,
    createRequestSaga(
      "vendorGoodsEvaluation/findById",
      goodsEvaluationAPI.findById
    )
  );
  yield takeLatest(
    vendorGoodsEvaluationActions.findByGoodItemId,
    createRequestSaga(
      "vendorGoodsEvaluation/findByGoodItemId",
      goodsEvaluationAPI.findByGoodItemId
    )
  );
}

//* reducer
const vendorGoodsEvaluation = createSlice({
  name: "vendorGoodsEvaluation",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "findById",
      reducerName: "findById",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findByGoodItemId",
      reducerName: "findByGoodItemId",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const vendorGoodsEvaluationActions = vendorGoodsEvaluation.actions;

export default vendorGoodsEvaluation;
