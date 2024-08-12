import React, { useState } from 'react';
import { Card, ListGroup, Pagination, Button } from 'react-bootstrap';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';

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

const ProductName = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: #555;
`;

const ReviewTitle = styled.h5`
  font-size: 1.2rem;
  color: #444;
  margin-top: 0.5rem;
`;

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="d-flex align-items-center">
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <FaStar key={`full-${i}`} color="#ffc107" />
        ))}
      {halfStar && <FaStarHalfAlt color="#ffc107" />}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <FaRegStar key={`empty-${i}`} color="#ffc107" />
        ))}
    </div>
  );
};

const UserReviews = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleVote = async (reviewId, voteType) => {
    try {
      const response = await axios.post(
        `/reviews/${reviewId}/${voteType}`,
        {},
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );
      // Update the UI with the new review data
      console.log('Vote successful:', response.data);
    } catch (error) {
      console.error('Error voting on review:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5">User Reviews</Card.Header>
      <Card.Body>
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
                  <ProductName>
                    {review.productName || 'Product/Service'}
                  </ProductName>
                  <ReviewTitle>
                    {review.title || 'No title provided'}
                  </ReviewTitle>
                  <StarRating rating={review.rating} />
                  <ReviewText>{review.comment}</ReviewText>
                  <ReviewMeta>
                    Reviewed on:{' '}
                    {new Date(
                      review.createdAt
                    ).toLocaleDateString() || 'Unknown date'}
                  </ReviewMeta>
                  <div className="d-flex align-items-center mt-2">
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() =>
                        handleVote(review._id, 'helpful')
                      }
                    >
                      <FaThumbsUp /> {review.helpfulCount}
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="ml-2"
                      onClick={() =>
                        handleVote(review._id, 'unhelpful')
                      }
                    >
                      <FaThumbsDown /> {review.unhelpfulCount}
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No reviews available.</ListGroup.Item>
          )}
        </ListGroup>
        <Pagination className="mt-3">
          {Array.from({
            length: Math.ceil(reviews.length / itemsPerPage),
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

export default UserReviews;
