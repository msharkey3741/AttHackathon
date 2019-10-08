import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import PropTypes from "prop-types";
class ChartsPage extends React.Component {
  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">Hourly Wave Heights</h3>
        <Line data={this.props.dataLine} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}
ChartsPage.propTypes={
  dataLine: PropTypes.shape()
}
export default ChartsPage;
