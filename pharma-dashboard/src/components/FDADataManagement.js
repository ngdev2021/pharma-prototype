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
            placeholder="Search all data"
            onChange={(e) => debouncedSearch(e)}
          />
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <SortableHeader
              onClick={() => handleSortChange('generic_name')}
            >
              Generic Name
            </SortableHeader>
            <SortableHeader
              onClick={() => handleSortChange('company_name')}
            >
              Company Name
            </SortableHeader>
            <th>Contact Info</th>
            <th>Presentation</th>
            <th>Type of Update</th>
            <SortableHeader
              onClick={() => handleSortChange('date_of_update')}
            >
              Date of Update
            </SortableHeader>
            <th>Availability Info</th>
            <th>Related Info</th>
            <th>Resolved Note</th>
            <th>Reason for Shortage</th>
            <SortableHeader
              onClick={() => handleSortChange('therapeutic_category')}
            >
              Therapeutic Category
            </SortableHeader>
            <SortableHeader
              onClick={() => handleSortChange('status')}
            >
              Status
            </SortableHeader>
            <SortableHeader
              onClick={() => handleSortChange('change_date')}
            >
              Change Date
            </SortableHeader>
            <SortableHeader
              onClick={() => handleSortChange('initial_posting_date')}
            >
              Initial Posting Date
            </SortableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredShortages.map((shortage) => (
            <React.Fragment key={shortage._id}>
              <tr>
                <td colSpan="14" className="bg-light text-center">
                  <strong>{shortage.generic_name}</strong>
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  <strong>Company Details</strong>
                </td>
                <td colSpan="6">
                  <strong>Shortage Details</strong>
                </td>
                <td colSpan="4">
                  <strong>Dates</strong>
                </td>
              </tr>
              <tr>
                <td>{shortage.generic_name}</td>
                <td>{shortage.company_name}</td>
                <td>{shortage.contact_info}</td>
                <td>{shortage.presentation}</td>
                <td>{shortage.type_of_update}</td>
                <td>{shortage.availability_info}</td>
                <td>{shortage.related_info}</td>
                <td>{shortage.resolved_note}</td>
                <td>{shortage.reason_for_shortage}</td>
                <td>{shortage.therapeutic_category}</td>
                <td>{shortage.status}</td>
                <td>
                  {new Date(
                    shortage.date_of_update
                  ).toLocaleDateString()}
                </td>
                <td>
                  {new Date(
                    shortage.change_date
                  ).toLocaleDateString()}
                </td>
                <td>
                  {new Date(
                    shortage.initial_posting_date
                  ).toLocaleDateString()}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </StyledContainer>
  );
};

export default FDAData;
