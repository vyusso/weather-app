import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import style from "./LoadingSpinner.module.css";

// LoadingSpinner component - shows a loading animation while fetching weather data
export default function LoadingSpinner() {
  return (
    <div className={style.loadingContainer}>
      {/* Spinning loading icon */}
      <FontAwesomeIcon icon={faSpinner} className={style.spinner} spin />
      {/* Loading message */}
      <p>Loading weather data...</p>
    </div>
  );
}
