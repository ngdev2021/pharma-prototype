import React from 'react';
import { Card, ListGroup, Button, Form } from 'react-bootstrap';

const CommunicationAndCollaboration = ({ supplier }) => {
  return (
    <Card className="mb-4">
      <Card.Header as="h5">
        Communication and Collaboration
      </Card.Header>
      <Card.Body>
        <ListGroup>
          {supplier.notes?.length > 0 ? (
            supplier.notes.map((note, index) => (
              <ListGroup.Item key={index}>
                {note.content} - {note.date}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No notes available.</ListGroup.Item>
          )}
        </ListGroup>
        <Form.Group controlId="note" className="mt-3">
          <Form.Label>Add Note</Form.Label>
          <Form.Control as="textarea" rows={2} />
          <Button variant="primary" className="mt-2">
            Add Note
          </Button>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default CommunicationAndCollaboration;
