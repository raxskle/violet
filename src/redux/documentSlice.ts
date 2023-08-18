import { type PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import type { Element, Document, ElementToAdd } from "./types";

const defaultDocument: Document = {
  documentName: "new page", // 文档名，非title
  documentTitle: {
    selected: true,
    title: "Title",
  },
  elements: [], // 使用的elements列表
};

// 键值对 (doc id => doc 详细内容)
const initialDocs: Record<string, Document> = {
  defaultDocId: defaultDocument,
};

// Document 表示整个文档
// 包含页面中所有的elements
export const documentSlice = createSlice({
  name: "document",
  initialState: initialDocs,
  reducers: {
    addDocData: (
      state,
      action: PayloadAction<{
        docId: string;
      }>
    ) => {
      const { docId } = action.payload;
      state[docId] = { ...defaultDocument };
    },
    editDocTitle: (
      state,
      action: PayloadAction<{
        docId: string;
        documentTitle: {
          selected: boolean;
          title: string;
        };
      }>
    ) => {
      const { docId, documentTitle } = action.payload;
      state[docId].documentTitle = { ...documentTitle };
    },
    // 增加一个element到指定位置
    addElement: (
      state,
      action: PayloadAction<{
        docId: string;
        data: ElementToAdd;
        index: number;
      }>
    ) => {
      const { docId, data, index } = action.payload;
      state[docId].elements.splice(index, 0, {
        id: nanoid(),
        style: data.style,
        type: data.type,
        content: data.content,
      });
    },

    // 修改某个element
    editElement: (
      state,
      action: PayloadAction<{ docId: string; element: Element }>
    ) => {
      const { docId, element } = action.payload;
      const targetIndex = state[docId].elements.findIndex((prevElement) => {
        return prevElement.id === element.id;
      });
      state[docId].elements.splice(targetIndex, 1, element);
    },
  },
});

//
export const { addDocData, editDocTitle, addElement, editElement } =
  documentSlice.actions;
export default documentSlice.reducer;
