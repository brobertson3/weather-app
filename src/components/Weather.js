import React from "react";
import sunIcon from "../icons/sun.svg";
import downArrow from "../icons/down-arrow.svg";
const Weather = props => {
  return (
    <div className="weather-condition-container">
      <p>
        {props.city}, {props.country}
      </p>
      <p>Today</p>
      <img id="weather-condition-icon" src={sunIcon} alt="weather icon" />
      <p>Current: {props.currentTemp}&deg;</p>
      <div className="high-low-container">
        <img className="high-temp-icon" src={downArrow} alt="up arrow" />
        <span>{props.highTemp}&deg;</span>

        <img src={downArrow} alt="down arrow" />
        <span>{props.lowTemp}&deg;</span>
      </div>
      <p>{props.description}</p>
    </div>
  );
};
export default Weather;
