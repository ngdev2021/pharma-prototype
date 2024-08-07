// src/components/FDADataManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FDADataManagement = () => {
  const [fdaData, setFdaData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/fda-data')
      .then((response) => {
        setFdaData(response.data);
      })
      .catch((error) => {
        setError(error);
        console.error(
          'There was an error fetching the FDA data!',
          error
        );
      });
  }, []);

  return (
    <div>
      <h1>FDA Data Management</h1>
      {error && <p>There was an error fetching the FDA data!</p>}
      <ul>
        {fdaData.map((data) => (
          <li key={data._id}>
            Drug Name: {data.drugName}, Status: {data.shortageStatus},
            Details: {data.details}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FDADataManagement;
