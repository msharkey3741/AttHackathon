import React from "react";
// import * as foreCastService from "../../services/forecastService"
import "./Weather.css";
import "react-fontawesome";

class BeachStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waterTemperature: 80.08,
      windSpeed: 3,
      weather: 98.6,
      city: "Orange County",
      country: "United States",
      dayOfTheWeek: "Friday",
      currentTime: "11:30"
    };
  }
  formatDay = utcDate => {
    const d = new Date(utcDate);
    const options = {
      day: "string"
    };

    return d.toLocaleString("en-US", options);
  };
  // componentDidMount() {}

  render() {
    return (
      <div className="card bg-dark text-white hero-image2">
        <img
          src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F1680140%2Fpexels-photo-1680140.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26fit%3Dcrop%26h%3D627%26w%3D1200"
          className="card-img"
          alt=""
        />
        <div className="card-img-overlay">
          <h1 className="card-title">
            <p style={{ font: "Serif" }}>Bolsa Chica Weather </p>
          </h1>
          <h5 className="beach info">
            {this.state.city}, {this.state.country}
          </h5>
          <h5 className="weather-info">
            <i className="fas fa-temperature-low" />
            Water Termperature : {this.state.waterTemperature}
            Fahrenheit
            <br />
            Wind Speed : {""}
            {this.state.windSpeed} MPH
            <br />
            Temperature : {this.state.weather} Fahrenheit
          </h5>
          <div className="graph">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMMeVZ5vxO6cfOrHGukv7cJKVeabVSHhCjTcUGD28ZERX6eIXm"
              alt="/"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BeachStats;
