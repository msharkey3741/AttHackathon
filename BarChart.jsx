import React from "react";
import PropTypes from "prop-types";

const Chart = ({ children }) => {
  return <div className="row justify-content-center">{children}</div>;
};

const Bar = ({ width, height, color, className, crowd }) => (
  <div
    style={{
      background: color,
      width: height,
      height: width,
      textAlign: "center",
      lineHeight: "100px",
      color: "white"
    }}
    className={`${className} text-center`}
  >
    {height > 40 && crowd}
  </div>
);

const BarChart = ({ data, total }) => {
  const itemWidth = 100;

  const itemMargin = 5;

  const dataLength = data.length;

  const massagedData = data.map(datum =>
    Object.assign({}, datum, { repos: (datum.repos / total) * 300 })
  );

  const chartHeight = total;

  return (
    <>
      <Chart width={chartHeight} height={dataLength * (itemWidth + itemMargin)}>
        {massagedData.map((datum, index, targetArray) => {
          return (
            <>
              <Bar
                key={datum.name}
                x={0}
                y={
                  (index === 0 && 0) ||
                  (index === 1 && targetArray[index - 1].repos) ||
                  (index === 2 && targetArray[index - 1].repos + datum.repos)
                }
                width={itemWidth}
                height={datum.repos}
                color={
                  (index === 0 && "#8cd9b3") ||
                  (index === 1 && "#ffd11a") ||
                  (index === 2 && "#ff8566")
                }
                className={
                  (index === 0 && "inset1") || (index === 2 && "inset2") || ""
                }
                crowd={
                  (index === 0 && "Empty") ||
                  (index === 1 && "Filling Up") ||
                  (index === 2 && "Packed")
                }
              />
            </>
          );
        })}
      </Chart>
      <div className="row justify-content-center" key="mostSay">
        {massagedData[0].repos > massagedData[1].repos &&
        massagedData[0].repos > massagedData[2].repos ? (
          <h6>
            Most say its <b>Empty</b>
          </h6>
        ) : null}
        {massagedData[1].repos > massagedData[0].repos &&
        massagedData[1].repos > massagedData[2].repos ? (
          <h6>
            Most say its <b>Filling Up</b>
          </h6>
        ) : null}
        {massagedData[2].repos > massagedData[0].repos &&
        massagedData[2].repos > massagedData[1].repos ? (
          <h6>
            Most say its <b>Packed</b>
          </h6>
        ) : null}

        {massagedData[0].repos === massagedData[1].repos &&
        massagedData[2].repos === massagedData[0].repos ? (
          <h6>Consensus is split! ¯\_(ツ)_/¯</h6>
        ) : null}
      </div>
    </>
  );
};

Chart.propTypes = {
  children: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any
};

Bar.propTypes = {
  x: PropTypes.any,
  y: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  color: PropTypes.any,
  className: PropTypes.any,
  crowd: PropTypes.any
};

BarChart.propTypes = {
  data: PropTypes.any,
  sendCrowd: PropTypes.any,
  total: PropTypes.any
};

export default BarChart;
