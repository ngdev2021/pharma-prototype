import React from 'react';
import { Card } from 'react-bootstrap';
import DataList from './DataList';

const UserOrders = ({ orders }) => {
  const renderOrder = (order) => (
    <div>
      Order #{order._id} - {order.status}
    </div>
  );

  return (
    <Card className="mb-4">
      <Card.Header as="h5">User Orders</Card.Header>
      <Card.Body>
        <DataList items={orders} renderItem={renderOrder} />
      </Card.Body>
    </Card>
  );
};

export default UserOrders;
