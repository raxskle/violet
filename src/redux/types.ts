// 编辑器的信息，包含创建了多少doc，当前选中的doc等
interface AppData {
  docIds: string[];
  selectedDocId: string;
}

interface Element {
  id: string;
  type: string;
  content: string;
  style: unknown;
}

// 待增加的element，无需带id
interface ElementToAdd {
  type: string;
  content: string;
  style: unknown;
}

// element的定义信息
interface ElementDefinition {
  type: string;
}

// doc的文档信息，包含内部的elements数组，doc本身设置信息
interface Document {
  documentName: string;
  documentTitle: {
    selected: boolean;
    title: string;
  };
  elements: Element[];
}

export type { AppData, Element, Document, ElementDefinition, ElementToAdd };
