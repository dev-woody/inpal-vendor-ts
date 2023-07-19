import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  [key: string]: boolean;
}

const initialState: InitialState = {};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (state, { payload: actionType }: PayloadAction<string>) => {
      state[actionType] = true;
    },
    finishLoading: (state, { payload: actionType }: PayloadAction<string>) => {
      state[actionType] = false;
    },
  },
});

export const { startLoading, finishLoading } = loadingSlice.actions;
