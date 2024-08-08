import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';

const FDADataManagement = () => {
  const [fdaData, setFdaData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFdaData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5000/api/fda-data',
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );
        setFdaData(response.data);
      } catch (error) {
        setError(error);
        console.error(
          'There was an error fetching the FDA data!',
          error
        );
      }
    };

    fetchFdaData();
  }, []);

  return (
    <Container>
      <h1>FDA Data Management</h1>
      {error ? (
        <Alert variant="danger">
          There was an error fetching the FDA data!
        </Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Drug Name</th>
              <th>Manufacturer</th>
              <th>Approval Date</th>
            </tr>
          </thead>
          <tbody>
            {fdaData.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.drugName}</td>
                <td>{item.manufacturer}</td>
                <td>{item.approvalDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default FDADataManagement;
