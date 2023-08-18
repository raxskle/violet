import React, { FC } from "react";
import style from "./DocItem.module.scss";
import type { Document } from "../../../../redux/types";

interface DocItemProps {
  doc: Document;
}
export const DocItem: FC<DocItemProps> = ({ doc }) => {
  const showName = doc.documentTitle.selected
    ? doc.documentTitle.title
    : doc.documentName;
  return (
    <div className={style["item"]}>
      <div className={style["doc-name"]}>{showName}</div>
    </div>
  );
};
