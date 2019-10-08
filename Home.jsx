import React from "react";
import Camera from "./CameraApp";
import Show1 from "./Show1";
import Show2 from "./Show2";
import Crowds from "./Crowds";
//import LiveStream from "./LiveStream";
import WaveChart from "./WaveChart/WaveChart";
import Show3 from "./Show3";

class Home extends React.Component {
  state = {
    showCamera: false,
    spotId: ""
  };
  showCamera = () => {
    this.setState(prevState => ({ showCamera: !prevState.showCamera }));
  };

  selectBeach = value => {
    this.setState(() => ({
      ...this.state,
      spotId: value
    }));
  };
  render() {
    return (
      <React.Fragment>
        {this.state.showCamera ? (
          <Camera showCamera={this.showCamera} />
        ) : (
          <React.Fragment>
            <Show1 selectBeach={this.selectBeach} />
            <Show2 showCamera={this.showCamera} />
            <Show3 spotId={this.state.spotId} />
            <Crowds spotId={this.state.spotId} />
            {/* <LiveStream /> */}
            <WaveChart />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default Home;
