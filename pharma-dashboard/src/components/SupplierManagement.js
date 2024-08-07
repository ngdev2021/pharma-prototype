// src/components/SupplierManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/suppliers')
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        setError(error);
        console.error(
          'There was an error fetching the suppliers!',
          error
        );
      });
  }, []);

  return (
    <Container className="container">
      <h1 className="mb-4">Supplier Management</h1>
      {error && (
        <p className="alert alert-danger">
          There was an error fetching the suppliers!
        </p>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Supplier Name</th>
            <th scope="col">Contact Info</th>
            <th scope="col">Items Supplied</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td>{supplier.name}</td>
              <td>{supplier.contactInfo}</td>
              <td>
                <ul>
                  {supplier.itemsSupplied.map((item) => (
                    <li key={item.itemId}>{item.itemId}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default SupplierManagement;
