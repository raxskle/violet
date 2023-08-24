import React, { FC, useState } from "react";
import style from "./DocItem.module.scss";
import type { Document } from "~redux/types";
import { ReactComponent as DeleteIcon } from "~assets/svg/doc-item-delete-icon.svg";

interface DocItemProps {
  doc: Document;
}
export const DocItem: FC<DocItemProps> = ({ doc }) => {
  const showName: string =
    doc.documentTitle.selected && doc.documentTitle.title
      ? doc.documentTitle.title
      : doc.documentName;

  const [hover, setHover] = useState(false);

  return (
    <div
      className={style["item"]}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={style["doc-name"]}>{showName}</div>
      {hover && <DeleteIcon className={style["delete-icon"]} />}
    </div>
  );
};
