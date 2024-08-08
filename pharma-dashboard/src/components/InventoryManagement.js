import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5000/api/inventory',
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );
        setInventory(response.data);
      } catch (error) {
        setError(error);
        console.error(
          'There was an error fetching the inventory!',
          error
        );
      }
    };

    fetchInventory();
  }, []);

  return (
    <Container>
      <h1>Inventory Management</h1>
      {error ? (
        <Alert variant="danger">
          There was an error fetching the inventory!
        </Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Drug Name</th>
              <th>Quantity</th>
              <th>Supplier</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.drugName}</td>
                <td>{item.quantity}</td>
                <td>{item.supplier}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default InventoryManagement;
