import React, { useState, type FC, useRef, useEffect } from "react";
import style from "./Text.module.scss";

import type { TextProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { editElement } from "../../../redux/documentSlice";
import { useSelection } from "../hooks/useSelection";
import { useTypeEnterAddText } from "../hooks/useTypeEnterAddText";
import { RootState } from "../../../redux/store";

// text为非换行文本，如果一行放不下在屏幕里会显示换行，但是不支持显示Enter换行
// 如果键入Enter的话，那么会在下方新建一个text
export const Text: FC<TextProps> = ({ element, index }) => {
  const dispatch = useDispatch();

  const selectedDocId = useSelector(
    (state: RootState) => state.appData.selectedDocId
  );

  const [texting, setTexting] = useState(true);

  const [focusStart, focusEnd, onSelect] = useSelection();

  const restrictTypeEnter = useTypeEnterAddText();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      ref={ref}
      className={style["text"]}
      onClick={() => {
        setTexting(true);
        onSelect();
      }}
      onSelect={() => {
        console.log("onselect");
        setTexting(true);
        onSelect();
      }}
    >
      {texting && (
        <textarea
          className={style["text-input"]}
          style={{ resize: "none" }}
          value={element.content}
          autoFocus
          onFocus={(e) => {
            // 选中和光标位置
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
      <div
        className={style["text-value"]}
        style={{ visibility: texting ? "hidden" : "visible" }}
      >
        {element.content}
      </div>
    </div>
  );
};
