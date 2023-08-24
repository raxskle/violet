import React, { type FC, useState } from "react";
import { Text } from "../Element/Text/Text";
import style from "./Wrapper.module.scss";
import AddEditor from "../Editor/AddEditor/AddEditor";
import MenuEditor from "../Editor/MenuEditor/MenuEditor";
import type { Element, WrapperProps, RenderElement } from "./types";
import { Divider } from "~components/Element/Divider/Divider";
import { Image } from "~components/Element/Image/Image";
import { ImageElement } from "~redux/types";

const renderElement: RenderElement = (
  element: Element | ImageElement,
  index: number,
  active: boolean
) => {
  switch (element.type) {
    case "image": {
      return (
        <Image
          element={element as ImageElement}
          index={index}
          active={active}
        />
      );
    }
    case "divider": {
      return <Divider element={element} index={index} active={active} />;
    }
    case "text":
    case "heading1":
    case "heading2":
    case "heading3":
    default: {
      return <Text element={element} index={index} active={active} />;
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
      tabIndex={0}
      onBlur={() => {
        setShowEditBar(false);
      }}
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

      {renderElement(element, index, active)}
    </div>
  );
};
