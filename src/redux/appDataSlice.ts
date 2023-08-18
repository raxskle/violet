import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppData } from "./types";

const initialappData: AppData = {
  docIds: ["defaultDocId"],
  selectedDocId: "defaultDocId",
};

// Document 表示整个文档
// 包含页面中所有的elements
export const appDataSlice = createSlice({
  name: "appData",
  initialState: initialappData,
  reducers: {
    // 增加一个doc
    addDocId: (state, action: PayloadAction<{ docId: string }>) => {
      const { docId } = action.payload;
      state.docIds.push(docId);
    },
  },
});

//
export const { addDocId } = appDataSlice.actions;
export default appDataSlice.reducer;
