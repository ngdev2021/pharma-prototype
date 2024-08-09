import React from 'react';
import { Bar } from 'react-chartjs-2';

const SupplierAnalyticsDashboard = ({ analytics }) => {
  // Check if analytics and its properties exist before accessing them
  if (!analytics || !analytics.labels || !analytics.data) {
    return <div>No analytics data available.</div>;
  }

  const data = {
    labels: analytics.labels,
    datasets: [
      {
        label: 'Supplier Analytics',
        data: analytics.data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Supplier Analytics Dashboard</h3>
      <Bar data={data} />
    </div>
  );
};

export default SupplierAnalyticsDashboard;
