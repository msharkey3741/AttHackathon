import React from "react";
import * as locationService from "../../services/locationService";
import * as forecastService from "../../services/forecastService";
import Slide from "react-reveal/Slide";
import ChartsPage from "./ChartsPage";

import PropTypes from "prop-types";

class WaveChart extends React.Component {
  state = {
    locations: [],
    spotId: 0,
    location: 0,
    dataLine: {
      labels: ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
      datasets: [
        {
          label: "AM Wave Height in Feet",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        },
        {
          label: "PM Wave Height in Feet",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(184, 185, 210, .3)",
          borderColor: "rgb(35, 26, 136)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
    }
  };
  componentDidMount() {
    locationService
      .getLocation()
      .then(this.locationSuccess)
      .catch(this.locationError);
  }
  componentDidUpdate() {
    if (this.props.spotId !== this.state.spotId) {
      forecastService
        .getForecast(this.props.spotId, this.props.county)
        .then(this.forecastSuccess)
        .catch(this.forecastError);
    }
  }
  forecastSuccess = res => {
    const newState = {
      spotId: this.props.spotId,
      dataLine: {
        ...this.state.dataLine,
        datasets: [
          {
            ...this.state.dataLine.datasets[0],
            data: res.item.forecasts
              .slice(0, 12)
              .map(forecast => forecast.size_Ft)
          },
          {
            ...this.state.dataLine.datasets[1],
            data: res.item.forecasts
              .slice(12, 24)
              .map(forecast => forecast.size_Ft)
          }
        ]
      }
    };
    this.setState(newState);
    console.log("forecast success", res);
  };
  forecastError = err => {
    console.log("forecast error", err);
  };
  locationSuccess = res => {
    this.setState({
      location: this.props.spotId,
      locations: res.item
    });
    forecastService
      .getForecast(res.item[0].spotId, res.item[0].county)
      .then(this.forecastSuccess)
      .catch(this.forecastError);

    console.log("Wave Height Success", res);
  };
  locationError = err => {
    console.log("Wave Height Error", err);
  };
  onChange = e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
    console.log("eeeeee", e);
  };
  render() {
    return (
      <Slide bottom>
        <div style={{ paddingTop: "10px" }}>
          <ChartsPage dataLine={this.state.dataLine}></ChartsPage>
        </div>
      </Slide>
    );
  }
}

WaveChart.propTypes = {
  spotId: PropTypes.number,
  county: PropTypes.string
};

export default WaveChart;
