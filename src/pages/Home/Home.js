import React from "react";
import Weather from "./Weather/Weather";
import style from "./Home.module.css";

export default function Home() {
  return (
    <div className={style.home}>
      <Weather />
    </div>
  );
}
