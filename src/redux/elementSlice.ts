import { createSlice } from "@reduxjs/toolkit";
import { ElementDefinition } from "./types";

const initialElements: { elements: ElementDefinition[] } = {
  elements: [
    { type: "text" },
    { type: "heading1" },
    { type: "heading2" },
    { type: "heading3" },
    { type: "divider" },
    { type: "image" },
  ],
};

export const elementSlice = createSlice({
  name: "elements",
  initialState: initialElements,
  reducers: {},
});
//
// export const {} = elementSlice.actions;
export default elementSlice.reducer;
