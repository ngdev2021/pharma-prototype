import React, { useState } from 'react';
import {
  Card,
  Form,
  Button,
  ListGroup,
  Pagination,
  Row,
  Col,
} from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styled from 'styled-components';

const DefaultAvatar = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
  margin-right: 15px;
`;

const ReviewText = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;
`;

const ReviewMeta = styled.div`
  font-size: 0.85rem;
  color: #777;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
`;

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <FaStar key={i} color="#ffc107" />
        ))}
      {halfStar && <FaStarHalfAlt color="#ffc107" />}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <FaRegStar key={i} color="#ffc107" />
        ))}
    </>
  );
};

const ReviewSection = ({ supplier, handleSaveReview }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const paginatedReviews = supplier.reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
              value={supplier.rating || ''}
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
              value={supplier.review || ''}
              onChange={(e) => (supplier.review = e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSaveReview}>
            Submit Review
          </Button>
        </Form>

        <ListGroup className="mt-3">
          {paginatedReviews.length > 0 ? (
            paginatedReviews.map((review, index) => (
              <ListGroup.Item key={index} className="d-flex">
                <DefaultAvatar>
                  {review.userInitials || 'U'}
                </DefaultAvatar>
                <div>
                  <UserName>
                    {review.userName || 'Anonymous'}
                  </UserName>
                  <StarRating rating={review.rating} />
                  <ReviewText>{review.comment}</ReviewText>
                  <ReviewMeta>
                    {review.date || 'Unknown date'}
                  </ReviewMeta>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No reviews available.</ListGroup.Item>
          )}
        </ListGroup>
        <Pagination className="mt-3">
          {Array.from({
            length: Math.ceil(supplier.reviews.length / itemsPerPage),
          }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Card.Body>
    </Card>
  );
};

export default ReviewSection;
