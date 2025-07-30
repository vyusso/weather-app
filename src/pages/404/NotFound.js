import React from "react";
import style from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={style.notFound}>
      <h1 className={style.title}>404 page not found</h1>
    </div>
  );
}
