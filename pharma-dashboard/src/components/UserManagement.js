import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5000/api/users',
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        setError(error);
        console.error(
          'There was an error fetching the users!',
          error
        );
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      {error && <p>There was an error fetching the users!</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            User ID: {user._id}, Name: {user.name}, Email:{' '}
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
