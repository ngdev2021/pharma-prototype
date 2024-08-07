// src/components/OrderManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Order Management</h1>
      {error && <p>There was an error fetching the orders!</p>}
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order ID: {order._id}, User ID: {order.userId}, Status:{' '}
            {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManagement;
