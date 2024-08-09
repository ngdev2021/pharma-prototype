import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import UserOverview from './UserOverview';
import UserOrders from './UserOrders';
import UserReviews from './UserReviews';

const UserSettings = ({ user }) => {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);

  const handleSave = () => {
    // Save user settings
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5">User Settings</Card.Header>
      <Card.Body>
        <UserOverview user={user} />
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </form>
      </Card.Body>
    </Card>
  );
};

export default UserSettings;
