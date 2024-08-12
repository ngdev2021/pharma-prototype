import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Button,
  Accordion,
  Alert,
} from 'react-bootstrap';
import CustomModal from './CustomModal';

const UserSettings = ({ user }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    frequency: 'daily',
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleSaveChanges = () => {
    console.log('Saved user settings:', { theme, notifications });
    setShowAlert(true);
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion requested');
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5">User Settings</Card.Header>
      <Card.Body>
        {showAlert && (
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Settings updated successfully!
          </Alert>
        )}
        <Form>
          <Form.Group controlId="formTheme">
            <Form.Label>Theme</Form.Label>
            <Form.Control
              as="select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formNotifications">
            <Form.Label>Notification Preferences</Form.Label>
            <Form.Check
              type="checkbox"
              label="Email"
              checked={notifications.email}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  email: e.target.checked,
                })
              }
            />
            <Form.Check
              type="checkbox"
              label="SMS"
              checked={notifications.sms}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  sms: e.target.checked,
                })
              }
            />
            <Form.Label className="mt-3">
              Notification Frequency
            </Form.Label>
            <Form.Control
              as="select"
              value={notifications.frequency}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  frequency: e.target.value,
                })
              }
            >
              <option value="instant">Instant</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </Form.Control>
          </Form.Group>

          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Security Settings</Accordion.Header>
              <Accordion.Body>
                <Form.Check
                  type="checkbox"
                  label="Enable Two-Factor Authentication"
                />
                <Button
                  variant="secondary"
                  onClick={handleChangePassword}
                  className="mt-2"
                >
                  Change Password
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteAccount}
            className="ml-2"
          >
            Delete Account
          </Button>
        </Form>
      </Card.Body>

      <CustomModal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        title="Change Password"
        body={
          <Form>
            <Form.Group controlId="formCurrentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
              />
            </Form.Group>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Password
            </Button>
          </Form>
        }
      />
    </Card>
  );
};

export default UserSettings;
