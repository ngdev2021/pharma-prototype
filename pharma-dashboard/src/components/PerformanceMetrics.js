import React from 'react';
import { Line } from 'react-chartjs-2';

const PerformanceMetrics = ({ metrics }) => {
  // Check if metrics and its properties exist before accessing them
  if (!metrics || !metrics.labels || !metrics.data) {
    return <div>No performance metrics available.</div>;
  }

  const data = {
    labels: metrics.labels,
    datasets: [
      {
        label: 'Supplier Performance',
        data: metrics.data,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div>
      <h3>Performance Metrics</h3>
      <Line data={data} />
    </div>
  );
};

export default PerformanceMetrics;
