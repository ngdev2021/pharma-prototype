// src/components/SupplierManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/suppliers',
          {
            headers: {
              'x-auth-token': localStorage.getItem('token'),
            },
          }
        );
        setSuppliers(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <Container>
      <h1>Supplier Management</h1>
      {error ? (
        <Alert variant="danger">
          There was an error fetching the suppliers!
        </Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact Info</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier._id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.contactInfo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default SupplierManagement;
