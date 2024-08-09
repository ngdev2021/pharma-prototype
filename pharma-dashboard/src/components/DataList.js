import React from 'react';
import { ListGroup } from 'react-bootstrap';

const DataList = ({ items, renderItem }) => {
  return (
    <ListGroup variant="flush">
      {items.length > 0 ? (
        items.map((item, index) => (
          <ListGroup.Item key={index}>
            {renderItem(item)}
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>No items available.</ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default DataList;
