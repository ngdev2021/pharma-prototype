// src/components/UserManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(
          'There was an error fetching the users!',
          error
        );
      });
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            Name: {user.name}, Email: {user.email}, Role: {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
