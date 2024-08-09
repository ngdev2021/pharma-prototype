import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchUserById,
  fetchUserOrders,
  fetchUserReviews,
} from '../utils/utilities';
import UserOverview from './UserOverview';
import UserActivityLog from './UserActivityLog';
import UserOrders from './UserOrders';
import UserReviews from './UserReviews';
import UserSettings from './UserSettings';

const UserDetailsPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserById(id);
        const userOrders = await fetchUserOrders(id);
        const userReviews = await fetchUserReviews(id);

        setUser(userData);
        setOrders(userOrders);
        setReviews(userReviews);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user details');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <UserOverview user={user} />
      <UserActivityLog user={user} />
      <UserOrders orders={orders} />
      <UserReviews reviews={reviews} />
      <UserSettings user={user} />
    </div>
  );
};

export default UserDetailsPage;
