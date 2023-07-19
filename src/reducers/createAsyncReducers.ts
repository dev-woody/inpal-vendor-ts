import { PayloadAction } from "@reduxjs/toolkit";

interface CreateAsyncReducersParams {
  actionName: string;
  reducerName: string;
  cleanDataWhenStart?: boolean;
}

export interface DataForm {
  data: any;
  success: boolean;
  message: string | null;
}

export interface ResponseData {
  [key: string]: any;
}

const createAsyncReducers =
  <State extends ResponseData>({
    actionName,
    reducerName,
    cleanDataWhenStart = false,
  }: CreateAsyncReducersParams) =>
  <Start, Success extends DataForm, Failure>() => {
    const result: {
      [key: string]:
        | ((state: State, action: PayloadAction<Start>) => void)
        | ((state: State, action: PayloadAction<Success>) => void)
        | ((state: State, action: PayloadAction<Failure>) => void);
    } = {
      // start reducer 함수
      [`${actionName}`]: (state: State, action: PayloadAction<Start>) => {
        if (cleanDataWhenStart) {
          (state[reducerName] as DataForm).data = null;
        }
      },
      // success reducer 함수
      [`${actionName}Success`]: (
        state: State,
        action: PayloadAction<Success>
      ) => {
        (state[reducerName] as DataForm).data = action.payload.data;
        (state[reducerName] as DataForm).success = action.payload.success;
        (state[reducerName] as DataForm).message = action.payload.message;
      },
      // fail reducer 함수
      [`${actionName}Failure`]: (
        state: State,
        action: PayloadAction<Success>
      ) => {
        (state[reducerName] as DataForm).data = action.payload.data;
        (state[reducerName] as DataForm).success = action.payload.success;
        (state[reducerName] as DataForm).message = action.payload.message;
      },
    };
    return result;
  };

export default createAsyncReducers;

export const createSingleReducers =
  ({ actionName }: { actionName: string }) =>
  <Start>() => {
    const result = {
      [`${actionName}`]: (state: any, action: PayloadAction<Start>) => {
        const reducerName = action.payload;
        (state[reducerName] as DataForm).data = null;
        (state[reducerName] as DataForm).success = false;
        (state[reducerName] as DataForm).message = null;
      },
    };
    return result;
  };
