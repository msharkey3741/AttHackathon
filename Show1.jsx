import React from "react";
import PropTypes from "prop-types";
import Fade from 'react-reveal/Fade';

const Show1 = props => {
  const changeHandler = e => {
    props.selectBeach(e.target.value);
  };
  return (
    <Fade left>
      <div className="hero-image">
        <div className="hero-text">
          <div>Welcome to</div>
          <h1>Surf Alone Together</h1>
          <br />
          <div className="form-group">
            <label htmlFor="sel1">
              <h3>Select Your Beach</h3>
            </label>
            <select className="form-control" id="sel1" onChange={changeHandler}>
              <option value="">Your Waves</option>
              <option value="222">Seal Beach Pier</option>
              <option value="603">Anderson Street</option>
              <option value="220">Goldenwest</option>
              <option value="221">Huntington Pier</option>
              <option value="217">The Wedge</option>
              <option value="604">Bolsa Chica State Beach</option>
            </select>
          </div>
        </div>
      </div>
    </Fade>
  );
};
Show1.propTypes = {
  selectBeach: PropTypes.func
};

export default Show1;
