import React, { useState, useMemo } from 'react';
import {
  Card,
  ListGroup,
  Pagination,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import ActivityTypeIcon from './ActivityTypeIcon';
import { debounce } from 'lodash';

const UserActivityLog = ({ user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;
  const activityLog = user?.activityLog || [];

  const debouncedSearchTerm = useMemo(
    () => debounce((term) => setSearchTerm(term), 300),
    []
  );

  const filteredActivityLog = activityLog
    .filter((activity) =>
      activity.message
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    debouncedSearchTerm(e.target.value);
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5">User Activity Log</Card.Header>
      <Card.Body>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search activity"
            onChange={handleSearchChange}
          />
          <Button variant="outline-secondary">
            <FaSearch />
          </Button>
        </InputGroup>
        <ListGroup variant="flush">
          {filteredActivityLog.length > 0 ? (
            filteredActivityLog.map((activity, index) => (
              <ListGroup.Item key={index}>
                <ActivityTypeIcon type={activity.type} />
                <div className="ml-3">
                  <strong>{activity.message}</strong>
                  <br />
                  <small>
                    {new Date(activity.timestamp).toLocaleString()}
                  </small>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No activity recorded.</ListGroup.Item>
          )}
        </ListGroup>
        <Pagination className="mt-3">
          {Array.from({
            length: Math.ceil(activityLog.length / itemsPerPage),
          }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Card.Body>
    </Card>
  );
};

export default UserActivityLog;
