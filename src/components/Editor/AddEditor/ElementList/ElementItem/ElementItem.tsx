import React, { FC } from "react";
import style from "./ElementItem.module.scss";
import { ElementDefinition, ElementToAdd } from "../../../../../redux/types";

interface ElementItemProps {
  element: ElementDefinition;
  clickItemAddElement: (elementData: ElementToAdd) => void;
}

// 功能：增加组件在某个位置
export const ElementItem: FC<ElementItemProps> = ({
  element,
  clickItemAddElement,
}) => {
  return (
    <div
      className={style["element-item"]}
      onClick={(e) => {
        e.stopPropagation(); // 阻止冒泡到顶层使得弹窗不消失
        clickItemAddElement({
          type: element.type,
          src: element.type === "image" ? "" : undefined,
          content: "",
          style: {},
        });
      }}
    >
      {element.type}
    </div>
  );
};
