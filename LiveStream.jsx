import React from "react";
import Slide from "react-reveal/Slide";
import "./Video.css";

class LiveStream extends React.Component {
  //   camera = () => {
  //     const image = this.camera.captureImage();
  //     this.uploadImage(image);
  //   };
  //   uploadImage = image => {
  //     cameraService
  //       .uploadImage(image)
  //       .then(this.success)
  //       .catch(this.error);
  //   };
  render() {
    return (
      <Slide bottom>
        <div className="live-stream">
          <iframe
            style={{
              width: "360",
              height: "540"
            }}
            src="https://www.youtube.com/embed/OWbI6WtlI-k?autoplay=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        </div>
      </Slide>
    );
  }
}

export default LiveStream;
