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
  countReview: {},
  pageReview: {},
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
  yield takeLatest(
    vendorGoodsEvaluationActions.countReview,
    createRequestSaga(
      "vendorGoodsEvaluation/countReview",
      goodsEvaluationAPI.countReview
    )
  );
  yield takeLatest(
    vendorGoodsEvaluationActions.pageReview,
    createRequestSaga(
      "vendorGoodsEvaluation/pageReview",
      goodsEvaluationAPI.pageReview
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
    ...createAsyncReducers({
      actionName: "countReview",
      reducerName: "countReview",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageReview",
      reducerName: "pageReview",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const vendorGoodsEvaluationActions = vendorGoodsEvaluation.actions;

export default vendorGoodsEvaluation;
