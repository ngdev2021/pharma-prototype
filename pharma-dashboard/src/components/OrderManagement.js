// src/components/OrderManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        setError(error);
        console.error(
          'There was an error fetching the orders!',
          error
        );
      });
  }, []);

  return (
    <StyledContainer>
      <h1>Order Management</h1>
      {error && <p>There was an error fetching the orders!</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </StyledContainer>
  );
};

export default OrderManagement;
