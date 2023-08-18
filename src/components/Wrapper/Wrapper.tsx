import React, { type FC, useState } from "react";
import { Text } from "../Element/Text/Text";
import style from "./Wrapper.module.scss";
import AddEditor from "../Editor/AddEditor/AddEditor";
import MenuEditor from "../Editor/MenuEditor/MenuEditor";
import type { Element, WrapperProps, RenderElement } from "./types";

const renderElement: RenderElement = (element: Element, index: number) => {
  switch (element.type) {
    case "text":
    default: {
      return <Text element={element} index={index} />;
    }
  }
};

export const Wrapper: FC<WrapperProps> = function ({ element, index }) {
  // 当前组件是否被选中或者活跃中
  const [active, setActive] = useState(false);

  // editBar 是hover时出现的编辑栏
  const [showEditBar, setShowEditBar] = useState(false);
  // selectionBar 是选中文本之后出现的编辑栏
  // const [showSelectionBar, setShowSelectionBar] = useState(false);

  return (
    <div
      className={style["container"]}
      onMouseOver={() => {
        setShowEditBar(true);
      }}
      onMouseOut={() => {
        setShowEditBar(false);
      }}
    >
      {/* 当hover或者组件被选中时出现editBar */}
      {/* {(showEditBar || active) &&  */}
      <div
        className={style["EditBar"]}
        style={{
          visibility: showEditBar || active ? "visible" : "hidden",
          opacity: showEditBar || active ? 1 : 0,
        }}
      >
        <AddEditor active={active} setActive={setActive} index={index} />
        <MenuEditor />
      </div>

      {/* {showSelectionBar && <div></div>} */}

      {renderElement(element, index)}
    </div>
  );
};
