import React, { FC } from "react";
import style from "./DocsManagement.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { DocItem } from "./DocItem/DocItem";

export const DocsManagement: FC<unknown> = () => {
  const docIds = useSelector((state: RootState) => state.appData.docIds);
  const docData = useSelector((state: RootState) => state.document);
  return (
    <div className={style["container"]}>
      {docIds.map((id) => {
        return <DocItem key={id} doc={docData[id]} />;
      })}
      {docIds.map((id) => {
        return <DocItem key={id} doc={docData[id]} />;
      })}
    </div>
  );
};
