import { useState } from "react";

// text等element选中时自动变为textarea，需要调用onSelect获取选中的文本位置
export const useSelection: () => [number, number, () => void] = () => {
  const [focusStart, setFocusStart] = useState(0);
  const [focusEnd, setFocusEnd] = useState(0);

  // 点击选择
  const onSelect = () => {
    const selection = window.getSelection();
    if (selection) {
      // 设置选中的文本起点位置和终点位置
      setFocusStart(Math.min(selection?.anchorOffset, selection?.focusOffset));
      setFocusEnd(Math.max(selection?.anchorOffset, selection?.focusOffset));
    }
  };

  return [focusStart, focusEnd, onSelect];
};
