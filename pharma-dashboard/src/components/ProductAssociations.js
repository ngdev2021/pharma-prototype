import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

const ProductAssociations = ({ supplier }) => {
  return (
    <Card className="mb-4">
      <Card.Header as="h5">Products Supplied</Card.Header>
      <Card.Body>
        <ListGroup>
          {supplier.products?.length > 0 ? (
            supplier.products.map((product, index) => (
              <ListGroup.Item key={index}>
                {product}
                <Button
                  variant="danger"
                  size="sm"
                  className="float-right"
                >
                  Remove
                </Button>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No products associated.</ListGroup.Item>
          )}
        </ListGroup>
        <Button variant="primary" className="mt-3">
          Add Product
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductAssociations;
