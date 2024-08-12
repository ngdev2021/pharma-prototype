import React, { useState } from 'react';
import { Card, Button, Image, Form } from 'react-bootstrap';
import styled from 'styled-components';

const defaultAvatar =
  'https://img.freepik.com/free-vector/man-red-shirt-with-white-collar_90220-2873.jpg?size=626&ext=jpg';

const UserOverviewCard = styled(Card)`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #f9f9f9;
  max-width: 400px;
  margin: auto; /* Center the card */
`;

const UserName = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const UserDetail = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  color: #555;
  margin: 10px 0;
`;

const EditButton = styled(Button)`
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

const SaveButton = styled(Button)`
  background-color: #28a745;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled(Button)`
  background-color: #dc3545;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
  margin-left: 10px;
  &:hover {
    background-color: #c82333;
  }
`;

const UserOverview = ({ user, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit(editedUser);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user); // Reset to original user data
  };

  return (
    <UserOverviewCard>
      <Image
        src={user.avatar || defaultAvatar}
        roundedCircle
        width="120"
        height="120"
        className="mb-4"
      />
      {isEditing ? (
        <>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={editedUser.role}
              onChange={handleChange}
            />
          </Form.Group>
          <SaveButton onClick={handleSave}>Save Changes</SaveButton>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </>
      ) : (
        <>
          <UserName>{editedUser.name}</UserName>
          <UserDetail>{editedUser.email}</UserDetail>
          <UserDetail>{editedUser.role}</UserDetail>
          <EditButton onClick={() => setIsEditing(true)}>
            Edit Profile
          </EditButton>
        </>
      )}
    </UserOverviewCard>
  );
};

export default UserOverview;
