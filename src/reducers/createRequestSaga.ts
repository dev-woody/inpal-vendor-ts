import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "./loading";
import { AxiosResponse } from "axios";

export default function createRequestSaga(type: string, request: any) {
  const SUCCESS = `${type}Success`;
  const FALIURE = `${type}Failure`;

  return function* findAllSaga(action: { payload: any }) {
    yield put(startLoading(type));
    try {
      const response: AxiosResponse = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response,
      });
    } catch (error) {
      yield put({ type: FALIURE, payload: error });
    }
    yield put(finishLoading(type));
  };
}
