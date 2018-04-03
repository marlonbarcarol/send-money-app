import React from 'react';
import PropTypes from 'prop-types';

const DonutChart = ({percentage, fillColorBackground = '#EAEAEE', fillColor = '#FFB428' }) => (
  <React.Fragment>
      <svg className="circle-chart" viewBox="0 0 33.83098862 33.83098862" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
        <circle className="circle-chart__background"
          stroke={ fillColorBackground } strokeWidth="2" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
        <circle className="circle-chart__circle" 
          stroke={fillColor} strokeWidth="2" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"
          strokeDasharray={ `${percentage},100` } />
      </svg>
  </React.Fragment>
);

DonutChart.propTypes = {
  percentage: PropTypes.number.isRequired,
  fillColorBackground: PropTypes.string,
  fillColor: PropTypes.string
};

export default DonutChart;