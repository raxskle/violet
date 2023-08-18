import React, { type FC } from "react";
import style from "./Home.module.scss";
import { DocContainer } from "../../components/DocContainer/DocContainer";
import Headquarter from "../../components/Headquarter/Headquarter";
import TopBar from "../../components/TopBar/TopBar";

const Home: FC<unknown> = () => {
  return (
    <div className={style["home-container"]}>
      <Headquarter />
      <main className={style["main-field"]}>
        <TopBar />
        <DocContainer />
      </main>
    </div>
  );
};
export default Home;
