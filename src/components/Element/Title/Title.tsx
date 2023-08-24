import React, { FC, useRef, useState } from "react";
import style from "./Title.module.scss";
import { useSelection } from "../hooks/useSelection";
import { useTypeEnterAddText } from "../hooks/useTypeEnterAddText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { editDocTitle } from "../../../redux/documentSlice";

// title 并非可选的element，而是document必选的第一个组件
const Title: FC<unknown> = () => {
  const dispatch = useDispatch();
  const selectedDocId = useSelector(
    (state: RootState) => state.appData.selectedDocId
  );
  const title = useSelector(
    (state: RootState) => state.document[selectedDocId].documentTitle.title
  );

  // 输入状态
  const [texting, setTexting] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [focusStart, focusEnd, onSelect] = useSelection(inputRef);
  const restrictTypeEnter = useTypeEnterAddText();

  return (
    <div
      className={style["title"]}
      onClick={() => {
        setTexting(true);
        onSelect();
      }}
    >
      {texting && (
        <textarea
          ref={inputRef}
          className={style["title-input"]}
          style={{ resize: "none" }}
          value={title}
          autoFocus
          onFocus={(e) => {
            // 选中和光标位置
            e.target.select();
            e.target.setSelectionRange(focusStart, focusEnd);
          }}
          onChange={(e) => {
            restrictTypeEnter(e, 0);

            dispatch(
              editDocTitle({
                docId: selectedDocId,
                documentTitle: {
                  selected: true,
                  title: e.target.value,
                },
              })
            );
          }}
          onBlur={() => setTexting(false)}
        />
      )}
      <div
        className={style["title-value"]}
        style={{ visibility: texting ? "hidden" : "visible" }}
      >
        {title}
      </div>
    </div>
  );
};
export default Title;
