import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const ActivityLog = ({ supplier }) => {
  return (
    <Card className="mb-4">
      <Card.Header as="h5">Activity Log</Card.Header>
      <Card.Body>
        <ListGroup>
          {supplier.activityLog?.length > 0 ? (
            supplier.activityLog.map((log, index) => (
              <ListGroup.Item key={index}>
                {log.timestamp} - {log.message}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No activities logged.</ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ActivityLog;
