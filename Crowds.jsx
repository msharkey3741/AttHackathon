import React from "react";
import BarChart from "./BarChart";
import logger from "../logger";
import * as crowdsService from ".././services/crowdsService";
import PropTypes from "prop-types";
import Slide from "react-reveal/Slide";

const _logger = logger.extend("Crowds");

class Crowds extends React.Component {
  state = {
    spotId: 0,
    data: [
      {
        name: "Empty",
        id: 1,
        repos: 0
      },
      {
        name: "Filling up",
        id: 2,
        repos: 0
      },
      {
        name: "Packed",
        id: 3,
        repos: 0
      }
    ],
    crowdedLevelId: null,
    total: 0
  };

  componentDidMount() {
    if (this.props.spotId) {
      crowdsService
        .getCrowdDataBySpotId(this.props.spotId)
        .then(this.setCrowd)
        .catch(this.errorResponse);
    }
  }

  componentDidUpdate() {
    if (this.props.spotId !== this.state.spotId) {
      crowdsService
        .getCrowdDataBySpotId(this.props.spotId)
        .then(this.setCrowd)
        .catch(this.errorResponse);
    }
  }

  errorResponse = response => {
    _logger(response);
  };

  setCrowd = response => {
    let repos1 = response.item.empty;
    let repos2 = response.item.moderate;
    let repos3 = response.item.busy;
    let total = repos1 + repos2 + repos3;

    this.setState(() => ({
      spotId: this.props.spotId,
      data: [
        {
          name: "Empty",
          id: 1,
          repos: repos1
        },
        {
          name: "Filling up",
          id: 2,
          repos: repos2
        },
        {
          name: "Packed",
          id: 3,
          repos: repos3
        }
      ],
      total
    }));
  };

  handleClick = evt => {
    let crowdedLevelId = evt.target.value;
    _logger(crowdedLevelId);

    let payload = {
      crowdedLevelId,
      spotId: this.props.spotId
    };

    crowdsService
      .submitCrowdLevel(payload)
      .then(this.setCrowd)
      .catch(this.errorResponse);

    // this.setState(() => ({
    //   crowdedLevelId
    // }));
  };

  render() {
    return (
      <Slide bottom>
        <div className="hero-image4">
          <div className="row justify-content-center mx-0">
            <div className="card hero-card" style={{ width: "340px" }}>
              {this.state.spotId === 0 ? (
                <div className="card-img-overlay">
                  <h3 className="card-title">
                    <p style={{ font: "Serif" }}>
                      Select your beach to see the crowd
                    </p>
                  </h3>
                </div>
              ) : (
                <div className="card-body">
                  <h5 className="text-center">How&apos;s the lineup?</h5>

                  <BarChart total={this.state.total} data={this.state.data} />

                  <div className="row mt-1 justify-content-center">
                    <button
                      value={1}
                      className="btn btn-success mx-1"
                      onClick={this.handleClick}
                    >
                      Empty
                    </button>
                    <button
                      value={2}
                      className="btn btn-warning mx-1"
                      onClick={this.handleClick}
                    >
                      Filling Up
                    </button>
                    <button
                      value={3}
                      className="btn btn-danger mx-1"
                      onClick={this.handleClick}
                    >
                      Packed
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Slide>
    );
  }
}

Crowds.propTypes = {
  spotId: PropTypes.any
};

export default Crowds;
