import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import user from "./user";
import vendorAdmin, { vendorAdminSaga } from "./admin/vendorAdmin";
import vendorProduct, { vendorProductSaga } from "./product/vendorProduct";
import vendorDeliveryCode, {
  vendorDeliveryCodeSaga,
} from "./deliveryCode/vendorDeliveryCode";
import vendorGoodsSpec, {
  vendorGoodsSpecSaga,
} from "./goodsGroup/vendorGoodsSpec";
import vendorGoodsGroup, {
  vendorGoodsGroupSaga,
} from "./goodsGroup/vendorGoodsGroup";
import vendorGoodsItems, {
  vendorGoodsItemsSaga,
} from "./goodsGroup/vendorGoodsItems";
import vendorGoodsEvaluation, {
  vendorGoodsEvaluationSaga,
} from "./goodsGroup/vendorGoodsEvaluation";
import vendorOrder, { vendorOrderSaga } from "./order/vendorOrder";

//* saga
const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    fork(vendorAdminSaga),
    fork(vendorProductSaga),
    fork(vendorDeliveryCodeSaga),
    fork(vendorGoodsSpecSaga),
    fork(vendorGoodsGroupSaga),
    fork(vendorGoodsItemsSaga),
    fork(vendorGoodsEvaluationSaga),
    fork(vendorOrderSaga),
  ]);
}

//* reducer
const rootReducer = combineReducers({
  user: user.reducer,
  vendorAdmin: vendorAdmin.reducer,
  vendorProduct: vendorProduct.reducer,
  vendorDeliveryCode: vendorDeliveryCode.reducer,
  vendorGoodsSpec: vendorGoodsSpec.reducer,
  vendorGoodsGroup: vendorGoodsGroup.reducer,
  vendorGoodsItems: vendorGoodsItems.reducer,
  vendorGoodsEvaluation: vendorGoodsEvaluation.reducer,
  vendorOrder: vendorOrder.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
