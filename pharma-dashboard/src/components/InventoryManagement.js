// src/components/InventoryManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/inventory')
      .then((response) => {
        setInventory(response.data);
      })
      .catch((error) => {
        setError(error);
        console.error(
          'There was an error fetching the inventory!',
          error
        );
      });
  }, []);

  return (
    <StyledContainer>
      <h1>Inventory Management</h1>
      {error && <p>There was an error fetching the inventory!</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>{item.expirationDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </StyledContainer>
  );
};

export default InventoryManagement;
