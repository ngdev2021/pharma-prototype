import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import UserOverview from './UserOverview';
import UserOrders from './UserOrders';
import UserReviews from './UserReviews';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

const UserDetailsPage = () => {
  const { id } = useParams(); // Assumes you're using react-router for routing
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:5000/api/users/${id}`,
          {
            headers: {
              'x-auth-token': localStorage.getItem('token'),
            },
          }
        );

        setUser(userResponse.data.user);
        setOrders(userResponse.data.orders);
        setReviews(userResponse.data.reviews);
        setLoading(false);
      } catch (err) {
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleEditProfile = async (updatedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${id}`,
        updatedUser,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );
      setUser(response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/users">Users</Breadcrumb.Item>
        <Breadcrumb.Item href={`/users/${id}`}>
          {user.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>User Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col md={4}>
          <UserOverview user={user} onEdit={handleEditProfile} />
        </Col>
        <Col md={8}>
          <UserOrders orders={orders} />
          <UserReviews reviews={reviews} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetailsPage;
