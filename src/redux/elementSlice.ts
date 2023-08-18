import { createSlice } from "@reduxjs/toolkit";
import { ElementDefinition } from "./types";

const initialElements: { elements: ElementDefinition[] } = {
  elements: [{ type: "text" }],
};

export const elementSlice = createSlice({
  name: "elements",
  initialState: initialElements,
  reducers: {},
});
//
// export const {} = elementSlice.actions;
export default elementSlice.reducer;
