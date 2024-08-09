import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const UserReviews = ({ reviews }) => {
  return (
    <Card className="mb-4">
      <Card.Header as="h5">User Reviews</Card.Header>
      <ListGroup variant="flush">
        {reviews.map((review) => (
          <ListGroup.Item key={review._id}>
            {review.rating} stars - {review.comment}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default UserReviews;
