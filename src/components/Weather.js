import React from "react";
import sunIcon from "../icons/sun.svg";
import downArrow from "../icons/down-arrow.svg";
const Weather = props => {
  const returnTempColor = temp => {
    if (temp < 50) {
      return "cold";
    } else if (temp >= 50 && temp < 75) {
      return "moderate";
    } else if (temp >= 75 && temp < 90) {
      return "warm";
    } else return "hot";
  };

  return (
    <div className="single-day-weather-condition-container">
      <p className="city-container">
        {props.city}, {props.country}
      </p>
      {/* <p>Today</p> */}
      <div className="weather-icon-container weather-split-container">
        <img id="weather-condition-icon" src={sunIcon} alt="weather icon" />
      </div>
      <div className="weather-details-container weather-split-container">
        <p>
          <span
            className={`temperature-numbers current-temp-number ${returnTempColor(
              props.currentTemp
            )}`}
          >
            {props.currentTemp}&deg;
          </span>
        </p>
        <div className="high-low-container">
          <img className="high-temp-icon" src={downArrow} alt="up arrow" />
          <span
            className={`temperature-numbers high-temp-number ${returnTempColor(
              props.highTemp
            )}`}
          >
            {props.highTemp}&deg;
          </span>

          <img className="low-temp-icon" src={downArrow} alt="down arrow" />
          <span
            className={`temperature-numbers low-temp-number ${returnTempColor(
              props.lowTemp
            )}`}
          >
            {props.lowTemp}&deg;
          </span>
        </div>
        <p className="weather-description">{props.description}</p>
      </div>
    </div>
  );
};
export default Weather;
