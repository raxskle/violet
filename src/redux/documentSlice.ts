import { type PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import type { Element, Document, ElementToAdd, ImageElement } from "./types";

const defaultDocument: Document = {
  documentName: "new page", // 文档名，非title
  documentTitle: {
    selected: true,
    title: "Title",
  },
  elements: [], // 使用的elements列表
  activeElementId: "",
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
        ...data,
      });
    },

    // 修改某个element
    editElement: (
      state,
      action: PayloadAction<{ docId: string; element: Element | ImageElement }>
    ) => {
      const { docId, element } = action.payload;
      const targetIndex = state[docId].elements.findIndex((prevElement) => {
        return prevElement.id === element.id;
      });
      state[docId].elements.splice(targetIndex, 1, element);
    },

    // 删除某个element
    deleteElement: (
      state,
      action: PayloadAction<{ docId: string; elementId: string }>
    ) => {
      const { docId, elementId } = action.payload;

      const prevIndex =
        state[docId].elements.findIndex((element) => element.id == elementId) -
        1;

      // 不可删除唯一一个
      if (state[docId].elements.length > 1) {
        state[docId].elements = state[docId].elements.filter(
          (element) => element.id !== elementId
        );
      }

      if (prevIndex >= 0) {
        // 设置上一个element为active
        console.log("active", state[docId].elements[prevIndex].id);
        state[docId].activeElementId = state[docId].elements[prevIndex].id;
      }
    },

    // 设置当前选中element
    setActiveElementId: (
      state,
      action: PayloadAction<{ docId: string; elementId: string }>
    ) => {
      const { docId, elementId } = action.payload;
      console.log("active", elementId);
      state[docId].activeElementId = elementId;
    },
  },
});

//
export const {
  addDocData,
  editDocTitle,
  addElement,
  editElement,
  deleteElement,
  setActiveElementId,
} = documentSlice.actions;
export default documentSlice.reducer;
