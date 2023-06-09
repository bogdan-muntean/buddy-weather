import React, { useState } from "react";
import "./Inputs.css";
import { UilSearchAlt, UilLocationPinAlt } from "@iconscout/react-unicons";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleSearchEvent = (e) => {
    e.preventDefault();
    if (city !== "") setQuery({ q: city });
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const handleUnitsChange = (e) => {
    const selectedUnits = e.currentTarget.name;
    if (units !== selectedUnits) setUnits(selectedUnits);
  };

  return (
    <div className="inputs-container">
      <form className="search-bar" onSubmit={(e) => handleSearchEvent(e)}>
        <input
          className="search-bar-input"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="search for city..."
        ></input>
      </form>
      <div className="search-buttons-container">
        <UilSearchAlt
          className="search-icon"
          onClick={handleSearchEvent}
          size={35}
          id="first-icon"
        ></UilSearchAlt>
        <UilLocationPinAlt
          className="search-icon"
          onClick={handleCurrentLocation}
          size={35}
        ></UilLocationPinAlt>
      </div>
      <div className="unit-buttons-container">
        <button
          className="unit-option"
          onClick={handleUnitsChange}
          name="metric"
        >
          °C
        </button>
        <p className="dividing-bar"> | </p>
        <button
          className="unit-option"
          onClick={handleUnitsChange}
          name="imperial"
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
