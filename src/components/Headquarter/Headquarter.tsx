import React from "react";
import style from "./Headquarter.module.scss";
import { UserInfo } from "./UserInfo/UserInfo";
import { DocsManagement } from "./DocsManagement/DocsManagement";
export default function Headquarter() {
  return (
    <div className={style["headquarter"]}>
      <UserInfo />

      <DocsManagement />
    </div>
  );
}
