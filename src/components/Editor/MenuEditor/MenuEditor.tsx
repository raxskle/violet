import React, { type FC } from "react";
import style from "./MenuEditor.module.scss";
import { ReactComponent as DragIcon } from "../../../assets/svg/menu-editor-drag-icon.svg";

const MenuEditor: FC<unknown> = () => {
  return (
    <div className={style["container"]}>
      <div className={style["icon"]}>
        <DragIcon />
      </div>
      {/* <div className={style.panelBox}></div> */}
    </div>
  );
};
export default MenuEditor;
