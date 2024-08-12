import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Breadcrumb,
  Button,
  ListGroup,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
);

// Styled Components
const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const OverviewCard = styled(Card)`
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: #e9e9e9;
  }
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overviewData, setOverviewData] = useState({
    totalOrders: 0,
    pendingReviews: 0,
    notifications: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [
          overviewResponse,
          activityResponse,
          notificationsResponse,
          chartResponse,
        ] = await Promise.all([
          axios.get('/dashboard/overview', {
            headers: { 'x-auth-token': token },
          }),
          axios.get('/dashboard/recent-activity', {
            headers: { 'x-auth-token': token },
          }),
          axios.get('/dashboard/notifications', {
            headers: { 'x-auth-token': token },
          }),
          axios.get('/dashboard/chart-data', {
            headers: { 'x-auth-token': token },
          }),
        ]);

        setOverviewData(overviewResponse.data);
        setRecentActivity(activityResponse.data);
        setNotifications(notificationsResponse.data);
        setChartData(chartResponse.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <StyledContainer className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </StyledContainer>
    );
  }

  if (error) {
    return (
      <StyledContainer className="text-center my-4">
        <Alert variant="danger">{error}</Alert>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col md={4}>
          <OverviewCard
            onClick={() => (window.location.href = '/orders')}
          >
            <Card.Title>Total Orders</Card.Title>
            <Card.Text>{overviewData.totalOrders}</Card.Text>
          </OverviewCard>
        </Col>
        <Col md={4}>
          <OverviewCard
            onClick={() => (window.location.href = '/reviews')}
          >
            <Card.Title>Pending Reviews</Card.Title>
            <Card.Text>{overviewData.pendingReviews}</Card.Text>
          </OverviewCard>
        </Col>
        <Col md={4}>
          <OverviewCard
            onClick={() => (window.location.href = '/notifications')}
          >
            <Card.Title>Notifications</Card.Title>
            <Card.Text>{overviewData.notifications}</Card.Text>
          </OverviewCard>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <h5>Recent Activity</h5>
          <ListGroup>
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <ListGroup.Item key={index}>
                  {activity.message} -{' '}
                  {new Date(activity.timestamp).toLocaleString()}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No recent activity</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
        <Col md={6}>
          <h5>Notifications</h5>
          <ListGroup>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <ListGroup.Item key={index}>
                  {notification.message} -{' '}
                  {new Date(notification.timestamp).toLocaleString()}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No notifications</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <h5>Order Volume Over Time</h5>
          <Line
            data={chartData}
            options={{
              responsive: true,
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'month',
                  },
                },
              },
            }}
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12} className="text-center">
          <Button variant="primary" as={Link} to="/place-order">
            Place a New Order
          </Button>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default Dashboard;
