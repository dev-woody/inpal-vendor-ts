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
  update: {},
  checkPass: {},
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
    vendorAdminActions.update,
    createRequestSaga("vendorAdmin/update", adminAPI.update)
  );
  yield takeLatest(
    vendorAdminActions.checkPass,
    createRequestSaga("vendorAdmin/checkPass", adminAPI.checkPassword)
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
      actionName: "checkPass",
      reducerName: "checkPass",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const vendorAdminActions = vendorAdmin.actions;

export default vendorAdmin;
