import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

const SupplierOverview = ({ supplier }) => {
  return (
    <Card className="mb-4">
      <Card.Header as="h5">
        {supplier.name}
        <Badge
          variant={
            supplier.status === 'Active' ? 'success' : 'warning'
          }
          className="ml-2"
        >
          {supplier.status}
        </Badge>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Contact Person:</strong>{' '}
          {supplier.contactInfo?.name || 'N/A'}
        </Card.Text>
        <Card.Text>
          <strong>Email:</strong>{' '}
          {supplier.contactInfo?.email || 'N/A'}
        </Card.Text>
        <Card.Text>
          <strong>Phone:</strong>{' '}
          {supplier.contactInfo?.phone || 'N/A'}
        </Card.Text>
        <Card.Text>
          <strong>Category:</strong> {supplier.category || 'N/A'}
        </Card.Text>
        <Card.Text>
          <strong>Risk Level:</strong> {supplier.riskLevel || 'N/A'}
        </Card.Text>
        <Button
          variant="primary"
          onClick={() => alert('Edit Supplier Clicked')}
        >
          Edit Supplier
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SupplierOverview;
