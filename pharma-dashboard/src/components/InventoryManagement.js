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

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('itemName');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5000/api/inventory',
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );
        setInventory(response.data);
        setLoading(false);
      } catch (error) {
        setError('There was an error fetching the inventory!');
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const debouncedSearch = useDebounce(handleSearch, 300);

  const handleSortChange = (key) => {
    setSortKey(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedInventory = [...inventory].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortKey]
        ?.toString()
        .localeCompare(b[sortKey]?.toString());
    }
    return b[sortKey]
      ?.toString()
      .localeCompare(a[sortKey]?.toString());
  });

  const filteredInventory = sortedInventory.filter((item) => {
    const term = searchTerm.toLowerCase();
    const values = Object.values(item).map((value) =>
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
            placeholder="Search inventory"
            onChange={(e) => debouncedSearch(e)}
          />
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <SortableHeader
              onClick={() => handleSortChange('itemName')}
            >
              Drug Name
            </SortableHeader>
            <th>Description</th>
            <SortableHeader
              onClick={() => handleSortChange('quantity')}
            >
              Quantity
            </SortableHeader>
            <SortableHeader
              onClick={() => handleSortChange('supplier')}
            >
              Supplier
            </SortableHeader>
            <SortableHeader
              onClick={() => handleSortChange('expirationDate')}
            >
              Expiry Date
            </SortableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.supplier}</td>
              <td>
                {new Date(item.expirationDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </StyledContainer>
  );
};

export default InventoryManagement;
