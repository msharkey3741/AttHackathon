import React from "react";
import * as cameraService from "../services/cameraService";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import propTypes from "prop-types";
import logger from "debug";
import { Button } from "reactstrap";
class CameraApp extends React.Component {
  constructor(props) {
    super(props);
  }
  onTakePhoto = dataUri => {
    logger(dataUri);
    // var base64Img = require("base64-img");
    // base64Img.imgSync(`${dataUri}`, "", "1", function(err, success) {});
    // logger("test");
    // var binary = atob(dataUri.split(",")[1]);
    // var array = [];
    // for (var i = 0; i < binary.length; i++) {
    //   array.push(binary.charCodeAt(i));
    // }
    // var blob = new Blob([new Uint8Array(array)], { type: "image/jpeg" });
    // this.cameraService(blob);
    // logger("dataUri");
  };

  cameraService = blob => {
    cameraService
      .uploadImage(blob)
      .then(this.success)
      .catch(this.error);
  };
  closeCamera = () => {
    this.props.showCamera();
  };
  // uploadImage = dataURI => {
  //
  // };
  // success = Response => {
  //   logger(Response);
  //   // this.onCameraStop();
  // };

  render() {
    return (
      <React.Fragment>
        <Camera
          onTakePhoto={dataUri => {
            this.onTakePhoto(dataUri);
          }}
          isImageMirror={true}
          isMaxResolution={true}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          //isFullscreen={true}
          //isDisplayStartCameraError={true}
          // onCameraStart={stream => {
          //   this.onCameraStart(stream);
          // }}
          // onCameraStop={() => {
          //   this.onCameraStop();
          // }}
        />

        <div className="hero-camera">
          <div className="hero-camera-text">
            <h2>Watson Data of your Photo:</h2>
            <h6>Wave Height: 10 Feet</h6>
            <h6>Watson Score: 0.91234</h6>
          </div>
          <div className="hero-button">
            <Button onClick={this.closeCamera}>Close Camera</Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
CameraApp.propTypes = {
  showCamera: propTypes.func
};
export default CameraApp;
