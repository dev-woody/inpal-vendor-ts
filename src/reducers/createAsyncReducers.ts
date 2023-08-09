import { PayloadAction } from "@reduxjs/toolkit";

interface CreateAsyncReducersParams {
  actionName: string;
  reducerName: string;
  cleanDataWhenStart?: boolean;
}

export interface DataForm {
  data: any;
  status: "idle" | "success" | "fail";
  message: string | null;
}

const initialState: DataForm = {
  data: null,
  status: "idle",
  message: null,
};

type AsyncEntity<T, R> = {
  data: T | null; // 데이터 없는 경우에는 명시적으로 null
  status: "idle" | "success" | "fail";
  message: R | null;
};

export interface ResponseData {
  [key: string]: any;
}

const createAsyncReducers =
  <State extends { [key: string]: any }>({
    actionName,
    reducerName,
    cleanDataWhenStart = false,
  }: CreateAsyncReducersParams) =>
  <Start, Success, Failure>() => {
    const result: {
      [key: string]:
        | ((state: State, action: PayloadAction<Start>) => void)
        | ((state: State, action: PayloadAction<Success>) => void)
        | ((state: State, action: PayloadAction<Failure>) => void);
    } = {
      // start reducer 함수
      [`${actionName}`]: (state: State, action: PayloadAction<Start>) => {
        if (cleanDataWhenStart) {
          (state[reducerName] as AsyncEntity<Success, Failure>).data = null;
        }
        (state[reducerName] as AsyncEntity<Success, Failure>).status = "idle";
        (state[reducerName] as AsyncEntity<Success, Failure>).message = null;
      },
      // success reducer 함수
      [`${actionName}Success`]: (
        state: State,
        action: PayloadAction<Success>
      ) => {
        (state[reducerName] as AsyncEntity<Success, Failure>).data =
          action.payload;
        (state[reducerName] as AsyncEntity<Success, Failure>).status =
          "success";
      },
      // fail reducer 함수
      [`${actionName}Failure`]: (
        state: State,
        action: PayloadAction<Failure>
      ) => {
        (state[reducerName] as AsyncEntity<Success, Failure>).message =
          action.payload;

        (state[reducerName] as AsyncEntity<Success, Failure>).status = "fail";
      },
    };
    return result;
  };

export default createAsyncReducers;

export const createSingleReducers =
  ({ actionName }: { actionName: string }) =>
  <ReducerName>() => {
    const result = {
      [`${actionName}`]: (state: any, action: PayloadAction<ReducerName>) => {
        const reducerName = action.payload;
        (state[reducerName] as DataForm) = initialState;
      },
    };
    return result;
  };
