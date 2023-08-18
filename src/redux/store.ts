import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "./documentSlice";
import elementSlice from "./elementSlice";
import appDataSlice from "./appDataSlice";

// 定义store，包含所有slice的reducer
export const store = configureStore({
  reducer: {
    document: documentReducer,
    elements: elementSlice,
    appData: appDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
