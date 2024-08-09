import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import styled from 'styled-components';

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 10px;
  font-size: 20px;
`;

const UserCard = ({ user }) => {
  return (
    <Card className="mb-4">
      <Card.Header className="d-flex align-items-center">
        <UserAvatar>{user.name.charAt(0).toUpperCase()}</UserAvatar>
        <div>
          <h5 className="mb-0">{user.name}</h5>
          <Badge variant="primary">{user.role}</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {/* Add more user details as needed */}
      </Card.Body>
    </Card>
  );
};

export default UserCard;
