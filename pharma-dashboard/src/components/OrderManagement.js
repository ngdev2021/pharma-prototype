import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5000/api/orders',
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        setError(error);
        console.error(
          'There was an error fetching the orders!',
          error
        );
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container>
      <h1>Order Management</h1>
      {error ? (
        <Alert variant="danger">
          There was an error fetching the orders!
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
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.drugName}</td>
                <td>{order.quantity}</td>
                <td>{order.supplier}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default OrderManagement;
