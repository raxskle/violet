import React, { type FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { addElement } from "../../redux/documentSlice";
import style from "./DocContainer.module.scss";
import { Wrapper } from "../Wrapper/Wrapper";
import { nanoid } from "@reduxjs/toolkit";
import Title from "../Element/Title/Title";
import { useMoveFocus } from "../Element/hooks/useMoveFocus";

// DocContainer 文章编辑器容器组件，按flex布局渲染所有elements
// 根据redux数据来显示的
export const DocContainer: FC<unknown> = () => {
  const dispatch = useDispatch();

  const selectedDocId = useSelector(
    (state: RootState) => state.appData.selectedDocId
  );

  const elements = useSelector(
    (state: RootState) => state.document[selectedDocId].elements
  );

  const documentTitle = useSelector(
    (state: RootState) => state.document[selectedDocId].documentTitle
  );

  useMoveFocus();

  console.log("elements", elements);

  return (
    <div className={style["container-scroll"]}>
      <div className={style["container"]}>
        {documentTitle.selected && <Title />}

        {/* 渲染wrapper，wrapper分发对应的element */}
        <div className={style["elementArea"]}>
          {elements.map((element, index) => (
            <Wrapper key={element.id} element={element} index={index} />
          ))}
        </div>

        {/* 增加组件 */}
        <br />
        <button
          onClick={() => {
            dispatch(
              addElement({
                docId: selectedDocId,
                data: {
                  type: "text",
                  content: "bbbb" + nanoid(),
                  style: {},
                },
                index: 0,
              })
            );
          }}
        >
          add element
        </button>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};
