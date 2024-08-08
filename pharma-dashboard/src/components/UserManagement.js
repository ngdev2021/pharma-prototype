import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';

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
    <Container>
      <h1>User Management</h1>
      {error ? (
        <Alert variant="danger">
          There was an error fetching the users!
        </Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserManagement;
