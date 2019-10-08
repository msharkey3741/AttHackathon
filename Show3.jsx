import React from "react";
import * as forecastService from "../services/forecastService";
import "../components/BeachStats/Weather.css";
import Slide from "react-reveal/Slide";
import PropTypes from "prop-types";

class BeachStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spotId: 0,
      waterTemperature: 80.08,
      windSpeed: 3,
      weather: 98.6,
      city: "Orange County",
      country: "United States",
      dayOfTheWeek: "Friday",
      currentTime: "11:30",
      locations: [
        { spotId: 222, name: "Seal Beach" },
        { spotId: 603, name: "Anderson St" },
        { spotId: 22, name: "Goldenwest" },
        { spotId: 221, name: "Huntington Pier" },
        { spotId: 217, name: "The Wedge" },
        { spotId: 604, name: "Bolsa Chica State Beach" }
      ]
    };
  }

  componentDidUpdate() {
    if (this.props.spotId !== this.state.spotId) {
      forecastService
        .getForecast(this.props.spotId, "orange-county")
        .then(this.getForecastSuccess);
    }
  }

  getForecast = spotId => {
    forecastService
      .getForecast(spotId)
      .then(this.forecastSuccess)
      .catch(this.forecastError);
  };

  getForecastSuccess = response => {
    //     let name = "";
    // if(this.props.id===604){

    // }
    this.setState({
      spotId: this.props.spotId,
      waterTemperature: response.item.waterTemp.fahrenheit,
      windSpeed: response.item.windDetails[0].speed_Mph,
      dayOfTheWeek: response.item.windDetails[0].day,
      currentTime: response.item.windDetails[0].hour
    });
  };

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
      <Slide bottom>
        <div className="hero-image5">
          <div className="row justify-content-center mx-0 pt-5">
            <div className="card hero-card" style={{ width: "340px" }}>
              {/* <img
          src="https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        /> */}
              <div className="card-img-overlay" style={{ color: "black" }}>
                <h3 className="card-title">
                  <p style={{ font: "Serif" }}>
                    {this.state.spotId === 0
                      ? "Select your beach to see the forecast"
                      : null}
                    {this.state.spotId === "604" ? (
                      <div>Bolsa Chica </div>
                    ) : null}
                    {this.state.spotId === "220" && "Goldenwest"}
                    {this.state.spotId === "222" && "Seal Beach"}
                    {this.state.spotId === "603" && "Anderson St"}
                    {this.state.spotId === "221" && "Huntington Pier"}
                    {this.state.spotId === "217" && "The Wedge"}
                  </p>
                </h3>
                {this.state.spotId !== 0 && (
                  <>
                    <h5 className="beachInfo">
                      {this.state.city}, {this.state.country}
                    </h5>
                    <h5 className="weather-info">
                      Water Temperature : {this.state.waterTemperature} °F
                      <br />
                      Wind Speed : {""}
                      {this.state.windSpeed} MPH
                      <br />
                      Temperature : {this.state.weather} {""} °F
                    </h5>
                  </>
                )}
                {/* <input
                name="isGoing"
                type="checkbox"
              //checked={this.state.isGoing}
              //onChange={this.handleInputChange}
              /> */}
                {/* <label style={{ fontSize: 20 }}>Check In to this Beach!</label> */}
              </div>
            </div>
          </div>
        </div>
      </Slide>
    );
  }
}

BeachStats.propTypes = {
  spotId: PropTypes.any
};

export default BeachStats;
