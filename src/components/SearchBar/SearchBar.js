import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import style from "./SearchBar.module.css";

// SearchBar component for city search and location functionality
export default function SearchBar({
  inputCity,
  setInputCity,
  handleSearch,
  handleLocationClick,
}) {
  return (
    <div className={style.search}>
      {/* City search input field */}
      <input
        type="text"
        placeholder="Search"
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {/* Search button */}
      <button onClick={handleSearch} title="Search for a city">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>

      {/* Location button - gets weather for current location */}
      <button
        onClick={handleLocationClick}
        className={style.locationBtn}
        title="Use my current location"
      >
        <FontAwesomeIcon icon={faLocationDot} />
      </button>
    </div>
  );
}
