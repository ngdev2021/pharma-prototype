import React from 'react';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';

const ReviewSection = ({ supplier, handleSaveReview }) => {
  return (
    <Card className="mb-4">
      <Card.Header as="h5">Reviews</Card.Header>
      <Card.Body>
        <h5>Rating: {supplier.rating || 'No ratings yet'}</h5>
        <Form>
          <Form.Group controlId="rating">
            <Form.Label>Rate Supplier</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => (supplier.rating = e.target.value)}
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Terrible</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="review">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => (supplier.review = e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSaveReview}>
            Submit Review
          </Button>
        </Form>
        <ListGroup className="mt-3">
          {supplier.reviews?.length > 0 ? (
            supplier.reviews.map((review, index) => (
              <ListGroup.Item key={index}>
                {review.comment} - Rated: {review.rating}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No reviews available.</ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ReviewSection;
