import React, { FC, useState } from "react";
import style from "./AddController.module.scss";
import { useAddDoc } from "~redux/useAddDoc";

export const AddController: FC<unknown> = () => {
  const addDoc = useAddDoc();

  return (
    <div
      className={style["item"]}
      onClick={() => {
        addDoc();
      }}
    >
      <div className={style["doc-name"]}>Add Document</div>
    </div>
  );
};
