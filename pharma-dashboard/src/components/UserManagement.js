// src/components/UserManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setError(error);
        console.error(
          'There was an error fetching the users!',
          error
        );
      });
  }, []);

  return (
    <StyledContainer>
      <h1>User Management</h1>
      {error && <p>There was an error fetching the users!</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </StyledContainer>
  );
};

export default UserManagement;
