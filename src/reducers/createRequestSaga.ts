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
      if (response.data?.success) {
        yield put({
          type: SUCCESS,
          payload: response.data?.data,
        });
      } else {
        yield put({ type: FALIURE, payload: response.data?.message });
      }
    } catch (error) {
      yield put({ type: FALIURE, payload: error });
    }
    yield put(finishLoading(type));
  };
}
