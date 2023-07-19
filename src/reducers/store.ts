import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import user from "./user";
import uploadImg, { uploadImgSaga } from "./common/uploadImg";
import vendorAdmin, { vendorAdminSaga } from "./admin/vendorAdmin";
import vendorProduct, { vendorProductSaga } from "./product/vendorProduct";
import vendorGoodsGroup, {
  vendorGoodsGroupSaga,
} from "./goodsGroup/vendorGoodsGroup";

//*  admin
import register, { registerSaga } from "./admin/register";
import findAllUnit, { findAllUnitSaga } from "./admin/findAllUnit";
//*  delivery
import deliveryFindAll, { deliveryFindAllSaga } from "./deliveryCode/findAll";
import deliveryRegister, {
  deliveryRegisterSaga,
} from "./deliveryCode/register";
import deliveryFindById, {
  deliveryFindByIdSaga,
} from "./deliveryCode/findById";
import deliveryUpdate, { deliveryUpdateSaga } from "./deliveryCode/update";
import deliveryFindByPId, {
  deliveryFindByPIdSaga,
} from "./deliveryCode/findByPId";
//*  goodsGroup
import goodsGroupImage, { goodsGroupImageSaga } from "./goodsGroup/image";
import detailPage, { detailPageSaga } from "./goodsGroup/detailPage";
import goodsGroupRegister, {
  goodsGroupRegisterSaga,
} from "./goodsGroup/register";
import goodsGroupUpdate, { goodsGroupUpdateSaga } from "./goodsGroup/update";
import groupSetSellStatus, {
  groupSetSellStatusSaga,
} from "./goodsGroup/setSellStatus";
//*  goodsGroup option
import optionFindAll, {
  optionFindAllSaga,
} from "./goodsGroup/option/optionFindAll";
import optionRegister, {
  optionRegisterSaga,
} from "./goodsGroup/option/optionRegister";
import optionFindById, {
  optionFindByIdSaga,
} from "./goodsGroup/option/optionFindById";
import optionUpdate, {
  optionUpdateSaga,
} from "./goodsGroup/option/optionUpdate";
import optionSetSellStatus, {
  optionSetSellStatusSaga,
} from "./goodsGroup/option/optionSetSellStatus";
//*  goodsGroup items
import itemRegister, { itemRegisterSaga } from "./goodsGroup/items/register";
import itemsFindAll, { itemsFindAllSaga } from "./goodsGroup/items/findAll";
import itemFindById, { itemFindByIdSaga } from "./goodsGroup/items/findById";
import itemUpdate, { itemUpdateSaga } from "./goodsGroup/items/update";
import itemSetSellStatus, {
  itemSetSellStatusSaga,
} from "./goodsGroup/items/setSellStatus";

//* saga
const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    fork(uploadImgSaga),
    fork(vendorAdminSaga),
    fork(vendorProductSaga),
    fork(vendorGoodsGroupSaga),
    //* 관리자
    fork(registerSaga),
    fork(findAllUnitSaga),
    //* 배송
    fork(deliveryFindAllSaga),
    fork(deliveryRegisterSaga),
    fork(deliveryFindByIdSaga),
    fork(deliveryUpdateSaga),
    fork(deliveryFindByPIdSaga),
    //* 상품그룹
    fork(goodsGroupImageSaga),
    fork(detailPageSaga),
    fork(goodsGroupRegisterSaga),
    fork(goodsGroupUpdateSaga),
    fork(groupSetSellStatusSaga),
    //* 상품그룹 옵션
    fork(optionFindAllSaga),
    fork(optionRegisterSaga),
    fork(optionFindByIdSaga),
    fork(optionUpdateSaga),
    fork(optionSetSellStatusSaga),
    //* 상품그룹 아이템
    fork(itemRegisterSaga),
    fork(itemsFindAllSaga),
    fork(itemFindByIdSaga),
    fork(itemUpdateSaga),
    fork(itemSetSellStatusSaga),
  ]);
}

//* reducer
const rootReducer = combineReducers({
  user: user.reducer,
  uploadImg: uploadImg.reducer,
  vendorAdmin: vendorAdmin.reducer,
  vendorProduct: vendorProduct.reducer,
  vendorGoodsGroup: vendorGoodsGroup.reducer,
  //* 관리자
  register: register.reducer,
  findAllUnit: findAllUnit.reducer,
  //* 배송
  deliveryFindAll: deliveryFindAll.reducer,
  deliveryRegister: deliveryRegister.reducer,
  deliveryFindById: deliveryFindById.reducer,
  deliveryUpdate: deliveryUpdate.reducer,
  deliveryFindByPId: deliveryFindByPId.reducer,
  //* 상품그룹
  goodsGroupImage: goodsGroupImage.reducer,
  detailPage: detailPage.reducer,
  goodsGroupRegister: goodsGroupRegister.reducer,
  goodsGroupUpdate: goodsGroupUpdate.reducer,
  groupSetSellStatus: groupSetSellStatus.reducer,
  //* 상품그룹 옵션
  optionFindAll: optionFindAll.reducer,
  optionRegister: optionRegister.reducer,
  optionFindById: optionFindById.reducer,
  optionUpdate: optionUpdate.reducer,
  optionSetSellStatus: optionSetSellStatus.reducer,
  //* 상품그룹 아이템
  itemRegister: itemRegister.reducer,
  itemsFindAll: itemsFindAll.reducer,
  itemFindById: itemFindById.reducer,
  itemUpdate: itemUpdate.reducer,
  itemSetSellStatus: itemSetSellStatus.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
