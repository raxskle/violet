import React, { FC, useEffect } from "react";
import style from "./Divider.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setActiveElementId } from "~redux/documentSlice";
import { Element } from "~redux/types";
import { RootState } from "~redux/store";

interface DividerProps {
  element: Element;
  index: number;
  active: boolean;
}

export const Divider: FC<DividerProps> = ({ element }) => {
  const dispatch = useDispatch();

  const selectedDocId = useSelector(
    (state: RootState) => state.appData.selectedDocId
  );

  useEffect(() => {
    dispatch(
      setActiveElementId({
        docId: selectedDocId,
        elementId: element.id,
      })
    );
  }, [dispatch, element.id, selectedDocId]);

  return (
    <div className={style["divider-wrapper"]}>
      <div className={style["divider"]}></div>
    </div>
  );
};
