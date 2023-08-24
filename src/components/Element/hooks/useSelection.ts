import { useState } from "react";

type UseSelectionType = (
  inputRef: React.RefObject<HTMLTextAreaElement>
) => [
  number,
  number,
  () => void,
  () => void,
  (ref: React.RefObject<HTMLDivElement>) => void
];

// text等element选中时自动变为textarea，需要调用onSelect获取选中的文本位置
export const useSelection: UseSelectionType = (inputRef) => {
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

  const autoFocusAtHead = () => {
    setFocusStart(0);
    setFocusEnd(0);
  };

  // 将focusStart 和 focusEnd 设置为末尾
  const autoFocusAtTail = (ref: React.RefObject<HTMLDivElement>) => {
    setFocusStart(ref.current?.innerText.length || 10000); // 10000 just in case
    setFocusEnd(ref.current?.innerText.length || 10000);
  };

  return [focusStart, focusEnd, onSelect, autoFocusAtHead, autoFocusAtTail];
};
