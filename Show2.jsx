import React from "react";
import propTypes from "prop-types";
import Fade from "react-reveal/Fade";
import { Button } from "reactstrap";
const Show2 = props => {
  const showCamera = () => {
    props.showCamera();
  };
  return (
    <Fade bottom>
      <div className="hero-image2">
        <div className="hero-text">
          <row>
            <h4>
              Camera so you can take a picture of your local beach and get a
              watson score
            </h4>
          </row>
          <row>
            <Button color="info" onClick={showCamera}>
              Camera
            </Button>
          </row>
        </div>
      </div>
    </Fade>
  );
};
Show2.propTypes = {
  showCamera: propTypes.func
};
export default Show2;
