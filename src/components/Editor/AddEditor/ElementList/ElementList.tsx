import React, { FC } from "react";
import style from "./ElementList.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { ElementItem } from "./ElementItem/ElementItem";
import { ElementToAdd } from "../../../../redux/types";

interface ElementListProps {
  clickItemAddElement: (elementData: ElementToAdd) => void;
}

export const ElementList: FC<ElementListProps> = ({ clickItemAddElement }) => {
  const elementList = useSelector(
    (state: RootState) => state.elements.elements
  );

  return (
    <div className={style["element-list-box"]}>
      {elementList.map((element) => (
        <ElementItem
          key={element.type}
          element={element}
          clickItemAddElement={clickItemAddElement}
        />
      ))}
    </div>
  );
};
