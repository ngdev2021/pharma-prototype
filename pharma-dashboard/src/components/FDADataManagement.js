// src/components/FDADataManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

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
    <Container className="container">
      <h1 className="mb-4">FDA Data Management</h1>
      {error && (
        <p className="alert alert-danger">
          There was an error fetching the FDA data!
        </p>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Drug Name</th>
            <th scope="col">Shortage Status</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {fdaData.map((data) => (
            <tr key={data._id}>
              <td>{data.drugName}</td>
              <td>{data.shortageStatus}</td>
              <td>{data.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default FDADataManagement;
