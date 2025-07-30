import React from "react";
import style from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className={style.navbar}>
      <h1 className={style.title}>Weather App</h1>
      <div className={style.right}>
        <div className={style.dropDownContainer}>
          <button className={style.dropDownBtn}>
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
          <div className={style.dropDownContent}>
            <Link to="/">Home</Link>
            {/* add more links here */}
          </div>
        </div>

        <h2 className={style.author}>
          by:{" "}
          <a href="https://github.com/vyusso" target="_blank">
            vyusso
          </a>
        </h2>
      </div>
    </div>
  );
}
