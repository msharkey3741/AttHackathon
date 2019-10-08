import React from "react";
import { Slide } from "pure-react-carousel";
import PropTypes from "prop-types";

const slide = props => {
  const imageClickHandler = evt => {
    props.makeBig(evt);
  };
  return (
    <Slide index={props.index}>
      <div
        className="owl-item cloned"
        style={{
          marginRight: "22.5px"
        }}
      >
        <div className="item">
          <img
            src={props.image.url}
            style={{ height: "95px" }}
            alt=""
            onClick={imageClickHandler}
          />
        </div>
      </div>
    </Slide>
  );
};
slide.propTypes = {
  image: PropTypes.any,
  index: PropTypes.any,
  makeBig: PropTypes.func
};

export default slide;
