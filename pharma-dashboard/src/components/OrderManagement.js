import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';
import { Breadcrumb } from 'react-bootstrap';

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
      <Breadcrumb>
        <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>Order Management</Breadcrumb.Item>
      </Breadcrumb>
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
              <th>Buyer</th>
            </tr>
          </thead>
          <tbody>
            {console.log(orders)}
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.items[0].drugName}</td>
                <td>{order.items[0].quantity}</td>
                <td>{order.items[0].supplier}</td>
                <td>{order.buyer}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default OrderManagement;
