import React, { useEffect, useState, useCallback } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

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

const FDAData = () => {
  const [shortages, setShortages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('generic_name');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate(); // Use navigate for navigation

  useEffect(() => {
    const fetchShortages = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/fda-data/shortages'
        );
        setShortages(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchShortages();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const debouncedSearch = useDebounce(handleSearch, 300);

  const handleSortChange = (key) => {
    setSortKey(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedShortages = [...shortages].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortKey]
        ?.toString()
        .localeCompare(b[sortKey]?.toString());
    }
    return b[sortKey]
      ?.toString()
      .localeCompare(a[sortKey]?.toString());
  });

  const filteredShortages = sortedShortages.filter((shortage) => {
    const term = searchTerm.toLowerCase();
    const values = Object.values(shortage).map((value) =>
      value ? value.toString().toLowerCase() : ''
    );
    return values.some((value) => value.includes(term));
  });

  const handleRowClick = (id) => {
    navigate(`/fda-shortages/${id}`); // Navigate to the detailed view
  };

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
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate('/')}>
          Home
        </Breadcrumb.Item>

        <Breadcrumb.Item active>FDA Shortage List</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col>
          <SearchInput
            type="text"
            placeholder="Search all data"
            onChange={(e) => debouncedSearch(e)}
          />
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>{/* ... SortableHeader definitions */}</tr>
        </thead>
        <tbody>
          {filteredShortages.map((shortage) => (
            <tr
              key={shortage._id}
              onClick={() => handleRowClick(shortage._id)}
              style={{ cursor: 'pointer' }}
            >
              <td>{shortage.generic_name}</td>
              <td>{shortage.company_name}</td>
              {/* Other data columns */}
            </tr>
          ))}
        </tbody>
      </Table>
    </StyledContainer>
  );
};

export default FDAData;
