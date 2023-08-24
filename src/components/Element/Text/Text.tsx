import React, { useState, type FC, useRef, useEffect } from "react";
import style from "./Text.module.scss";

import type { TextProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { editElement, setActiveElementId } from "../../../redux/documentSlice";
import { useSelection } from "../hooks/useSelection";
import { useTypeEnterAddText } from "../hooks/useTypeEnterAddText";
import { RootState } from "../../../redux/store";
import { useTypeDeleteElement } from "../hooks/useTypeDeleteElement";
import { SubType } from "./SubType";

// text为非换行文本，如果一行放不下在屏幕里会显示换行，但是不支持显示Enter换行
// 如果键入Enter的话，那么会在下方新建一个text
export const Text: FC<TextProps> = ({ element, index }) => {
  const dispatch = useDispatch();

  const selectedDocId = useSelector(
    (state: RootState) => state.appData.selectedDocId
  );

  const activeElementId = useSelector(
    (state: RootState) => state.document[selectedDocId].activeElementId
  );

  const [texting, setTexting] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [focusStart, focusEnd, onSelect, autoFocusAtHead, autoFocusAtTail] =
    useSelection(inputRef);

  const restrictTypeEnter = useTypeEnterAddText();

  // 为空时delete，删除该组件，同时使上一个组件active
  useTypeDeleteElement(inputRef, selectedDocId, element.id);

  // 当active时，设置texting
  useEffect(() => {
    if (activeElementId === element.id) {
      setTexting(true);

      // todo: 根据字段focus在头部或尾部
      autoFocusAtHead();
      autoFocusAtTail(ref);
    }
  }, [activeElementId]);

  // 方向键不能设置成通用的，只能设置成text的
  // active时不能每次都是focus在文字最后
  // 除了设置active以外，如果active的element是text，那么还要设置focus的位置
  // 只需可选focus在开头或结尾
  // 在element加focusPosition字段，每次setActive时判断一下text就设置focusPosition字段

  // 需要在本组件还有文字且在最前点delete时，删除本组件，并入上一个组件

  return (
    <div
      ref={ref}
      className={style[element.type]}
      onClick={() => {
        setTexting(true);
        onSelect();
      }}
      onSelect={() => {
        setTexting(true);
        onSelect();
      }}
    >
      {texting && (
        <textarea
          ref={inputRef}
          className={style[`${element.type}-input`]}
          style={{ resize: "none" }}
          value={element.content}
          autoFocus
          onFocus={(e) => {
            // 选中和光标位置
            // 全局设置选中
            dispatch(
              setActiveElementId({
                docId: selectedDocId,
                elementId: element.id,
              })
            );
            e.target.select();
            e.target.setSelectionRange(focusStart, focusEnd);
          }}
          onChange={(e) => {
            restrictTypeEnter(e, index + 1);
            dispatch(
              editElement({
                docId: selectedDocId,
                element: { ...element, content: e.target.value },
              })
            );
          }}
          onBlur={() => setTexting(false)}
        />
      )}
      <SubType
        type={element.type}
        className={style[`${element.type}-value`]}
        style={{ visibility: texting ? "hidden" : "visible" }}
      >
        {element.content}
      </SubType>
    </div>
  );
};
