import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Container,
  Table,
  Spinner,
  Alert,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import styled from 'styled-components';
import { debounce } from 'lodash';

// Styled Components
const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const SearchInput = styled(Form.Control)`
  margin-bottom: 20px;
`;

const SortableHeader = styled.th`
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

// Debounce Hook
const useDebounce = (callback, delay) => {
  const debouncedCallback = useCallback(
    debounce(callback, delay),
    []
  );
  return debouncedCallback;
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

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
        setLoading(false);
      } catch (error) {
        setError('There was an error fetching the users!');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const debouncedSearch = useDebounce(handleSearch, 300);

  const handleSortChange = (key) => {
    setSortKey(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortKey]
        ?.toString()
        .localeCompare(b[sortKey]?.toString());
    }
    return b[sortKey]
      ?.toString()
      .localeCompare(a[sortKey]?.toString());
  });

  const filteredUsers = sortedUsers.filter((user) => {
    const term = searchTerm.toLowerCase();
    const values = Object.values(user).map((value) =>
      value ? value.toString().toLowerCase() : ''
    );
    return values.some((value) => value.includes(term));
  });

  if (loading) {
    return (
      <StyledContainer className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </StyledContainer>
    );
  }

  if (error) {
    return (
      <StyledContainer className="text-center my-4">
        <Alert variant="danger">{error}</Alert>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Row>
        <Col>
          <SearchInput
            type="text"
            placeholder="Search users"
            onChange={(e) => debouncedSearch(e)}
          />
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <SortableHeader onClick={() => handleSortChange('_id')}>
              ID
            </SortableHeader>
            <SortableHeader onClick={() => handleSortChange('name')}>
              User's Name
            </SortableHeader>
            <SortableHeader onClick={() => handleSortChange('email')}>
              Email
            </SortableHeader>
            <SortableHeader onClick={() => handleSortChange('role')}>
              Role
            </SortableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
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
