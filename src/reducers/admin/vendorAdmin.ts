import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as adminAPI from "api/admin";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  signIn: {},
  signUp: {},
  register: {},
  update: {},
  findAll: {},
  findByUserId: {},
  mypage: {},
  findCompany: {},
  checkPass: {},
  changePass: {},

  basicInfo: {},
  registrationInfo: {},
  accountInfo: {},
  serviceInfo: {},
  addressInfo: {},
};

export function* vendorAdminSaga() {
  yield takeLatest(
    vendorAdminActions.signIn,
    createRequestSaga("vendorAdmin/signIn", adminAPI.vendorLogin)
  );
  yield takeLatest(
    vendorAdminActions.signUp,
    createRequestSaga("vendorAdmin/signUp", adminAPI.signUp)
  );
  yield takeLatest(
    vendorAdminActions.register,
    createRequestSaga("vendorAdmin/register", adminAPI.register)
  );
  yield takeLatest(
    vendorAdminActions.update,
    createRequestSaga("vendorAdmin/update", adminAPI.update)
  );
  yield takeLatest(
    vendorAdminActions.findAll,
    createRequestSaga("vendorAdmin/findAll", adminAPI.findAll)
  );
  yield takeLatest(
    vendorAdminActions.findByUserId,
    createRequestSaga("vendorAdmin/findByUserId", adminAPI.findByUserId)
  );
  yield takeLatest(
    vendorAdminActions.mypage,
    createRequestSaga("vendorAdmin/mypage", adminAPI.mypage)
  );
  yield takeLatest(
    vendorAdminActions.findCompany,
    createRequestSaga("vendorAdmin/findCompany", adminAPI.findCompany)
  );
  yield takeLatest(
    vendorAdminActions.checkPass,
    createRequestSaga("vendorAdmin/checkPass", adminAPI.checkPassword)
  );
  yield takeLatest(
    vendorAdminActions.changePass,
    createRequestSaga("vendorAdmin/changePass", adminAPI.changePass)
  );

  yield takeLatest(
    vendorAdminActions.basicInfo,
    createRequestSaga("vendorAdmin/basicInfo", adminAPI.basicInfo)
  );
  yield takeLatest(
    vendorAdminActions.registrationInfo,
    createRequestSaga("vendorAdmin/registrationInfo", adminAPI.registrationInfo)
  );
  yield takeLatest(
    vendorAdminActions.accountInfo,
    createRequestSaga("vendorAdmin/accountInfo", adminAPI.accountInfo)
  );
  yield takeLatest(
    vendorAdminActions.serviceInfo,
    createRequestSaga("vendorAdmin/serviceInfo", adminAPI.serviceInfo)
  );
  yield takeLatest(
    vendorAdminActions.addressInfo,
    createRequestSaga("vendorAdmin/addressInfo", adminAPI.addressInfo)
  );
}

//* reducer
const vendorAdmin = createSlice({
  name: "vendorAdmin",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "signIn",
      reducerName: "signIn",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "update",
      reducerName: "update",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "signUp",
      reducerName: "signUp",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "register",
      reducerName: "register",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAll",
      reducerName: "findAll",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findByUserId",
      reducerName: "findByUserId",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "mypage",
      reducerName: "mypage",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findCompany",
      reducerName: "findCompany",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "checkPass",
      reducerName: "checkPass",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "changePass",
      reducerName: "changePass",
    })<any, DataForm, string>(),

    ...createAsyncReducers({
      actionName: "basicInfo",
      reducerName: "basicInfo",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "registrationInfo",
      reducerName: "registrationInfo",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "accountInfo",
      reducerName: "accountInfo",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "serviceInfo",
      reducerName: "serviceInfo",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "addressInfo",
      reducerName: "addressInfo",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const vendorAdminActions = vendorAdmin.actions;

export default vendorAdmin;
