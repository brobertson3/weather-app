import React from "react";
import ReactDOM from "react-dom";
// import LocationSearchInput from "./components/LocationSearchInput";
import "./index.css";
// import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import sunIcon from "./icons/sun.svg";
import downArrow from "./icons/down-arrow.svg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      currentTemp: undefined,
      highTemp: undefined,
      lowTemp: undefined,
      city: undefined,
      country: undefined,
      description: undefined,
      condition: undefined,
      humidity: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // Grabs the value in the input field every time it is changed
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // Constructs the API call for OpenWeather and grabs the response and converts to JSON
  //TODO - works for zipcode now, need to expand for city, state, country and regex validation
  getWeather = async () => {
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const zip = this.state.value;

    // Convert from Kelvin to Farenheit
    const convertTemp = temp => {
      return Math.round(((temp - 273.15) * 9) / 5 + 32);
    };

    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${zip}&appid=${WEATHER_API_KEY}`
    );

    const response = await api_call.json();

    console.log(response);

    this.setState({
      currentTemp: convertTemp(response.main.temp),
      highTemp: convertTemp(response.main.temp_max),
      lowTemp: convertTemp(response.main.temp_min),
      humidity: response.main.humidity,
      city: response.name,
      country: response.sys.country,
      description: response.weather[0].description,
      condition: response.weather[0].main
    });
  };

  // Action to take when the user clicks the submit button
  handleSubmit(event) {
    this.getWeather();
    event.preventDefault();
  }

  render() {
    return (
      <div className="background">
        <p>Please enter in your location (city/state or zip code)</p>
        {/* This gets the location from the user */}

        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        {/* <LocationSearchInput /> */}

        <p>
          {this.state.city}, {this.state.country}
        </p>
        <p>Today</p>
        <img id="weather-condition-icon" src={sunIcon} alt="weather icon" />
        <p>Current: {this.state.currentTemp}&deg;</p>
        <div className="high-low-container">
          <img className="high-temp-icon" src={downArrow} alt="up arrow" />
          <span>{this.state.highTemp}&deg;</span>

          <img src={downArrow} alt="down arrow" />
          <span>{this.state.lowTemp}&deg;</span>
        </div>
        <p>{this.state.description}</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
