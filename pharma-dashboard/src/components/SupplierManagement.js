import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import {
  Container,
  Table,
  Spinner,
  Alert,
  Form,
  Row,
  Col,
  Button,
  Modal,
  Pagination,
  Tabs,
  Tab,
} from 'react-bootstrap';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { useAppContext } from '../context/AppContext';

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
  const debouncedCallback = useCallback(debounce(callback, delay), [
    callback,
    delay,
  ]);
  return debouncedCallback;
};

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const { currentUser, setCurrentUser } = useAppContext();
  // Decode token to get the user ID
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token: ', decodedToken); // Log the decoded token

        // Extract the user ID from the correct path in the token
        if (decodedToken.user && decodedToken.user.id) {
          setCurrentUser({ _id: decodedToken.user.id });
        } else {
          console.error('User ID not found in the decoded token');
        }
      } catch (err) {
        console.error('Failed to decode token: ', err);
      }
    } else {
      console.error('No token found in localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/suppliers',
          {
            headers: {
              'x-auth-token': localStorage.getItem('token'),
            },
          }
        );
        setSuppliers(response.data);
        setLoading(false);
      } catch (error) {
        setError('There was an error fetching the suppliers!');
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const debouncedSearch = useDebounce((event) => {
    setSearchTerm(event.target.value);
  }, 300);

  const handleSortChange = (key) => {
    setSortKey(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleShowModal = async (supplier = null) => {
    if (supplier) {
      const reviewsResponse = await axios.get(
        `http://localhost:5000/api/reviews?supplierId=${supplier._id}`,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );
      supplier.reviews = reviewsResponse.data;
    }
    setCurrentSupplier(supplier);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentSupplier(null);
  };

  const handleSaveSupplier = async () => {
    if (currentSupplier._id) {
      // Update existing supplier
      await axios.put(
        `http://localhost:5000/api/suppliers/${currentSupplier._id}`,
        currentSupplier,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );
    } else {
      // Add new supplier
      await axios.post(
        'http://localhost:5000/api/suppliers',
        currentSupplier,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );
    }
    handleCloseModal();
    const response = await axios.get(
      'http://localhost:5000/api/suppliers',
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      }
    );
    setSuppliers(response.data);
  };

  const handleSaveReview = async () => {
    if (!currentSupplier.rating) {
      alert('Please provide a rating for the supplier.');
      return;
    }

    console.log('User ID in Review:', currentUser._id); // Log the user ID before submitting

    const newReview = {
      userId: currentUser._id, // Ensure this is a valid ObjectId
      supplierId: currentSupplier._id,
      rating: currentSupplier.rating,
      comment: currentSupplier.review,
    };

    console.log('Sending review:', newReview); // Debugging log

    try {
      const response = await axios.post(
        'http://localhost:5000/api/reviews',
        newReview,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );
      console.log('Review saved successfully:', response.data);

      // Fetch updated supplier data with reviews
      const supplierResponse = await axios.get(
        `http://localhost:5000/api/suppliers/${currentSupplier._id}`,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );
      setCurrentSupplier(supplierResponse.data);
    } catch (error) {
      console.error(
        'Failed to save review:',
        error.response?.data || error.message
      );
      alert(
        `Failed to save review: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleDeleteSupplier = async (id) => {
    await axios.delete(`http://localhost:5000/api/suppliers/${id}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
    const response = await axios.get(
      'http://localhost:5000/api/suppliers',
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      }
    );
    setSuppliers(response.data);
  };

  const handleBulkSelect = (e, id) => {
    if (e.target.checked) {
      setSelectedSuppliers([...selectedSuppliers, id]);
    } else {
      setSelectedSuppliers(
        selectedSuppliers.filter((supplierId) => supplierId !== id)
      );
    }
  };

  const handleBulkAction = async () => {
    // Example: Bulk delete
    await Promise.all(
      selectedSuppliers.map(async (id) => {
        await axios.delete(
          `http://localhost:5000/api/suppliers/${id}`,
          {
            headers: {
              'x-auth-token': localStorage.getItem('token'),
            },
          }
        );
      })
    );
    const response = await axios.get(
      'http://localhost:5000/api/suppliers',
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      }
    );
    setSuppliers(response.data);
    setSelectedSuppliers([]);
  };

  const handleInlineEdit = (id, field, value) => {
    setSuppliers(
      suppliers.map((supplier) =>
        supplier._id === id
          ? { ...supplier, [field]: value }
          : supplier
      )
    );
  };

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortKey]
        ?.toString()
        .localeCompare(b[sortKey]?.toString());
    }
    return b[sortKey]
      ?.toString()
      .localeCompare(a[sortKey]?.toString());
  });

  const filteredSuppliers = sortedSuppliers.filter((supplier) => {
    const term = searchTerm.toLowerCase();
    const statusMatch = filterStatus.length
      ? filterStatus.includes(supplier.status)
      : true;
    const values = Object.values(supplier).map((value) =>
      value ? value.toString().toLowerCase() : ''
    );
    return (
      statusMatch && values.some((value) => value.includes(term))
    );
  });

  const paginatedSuppliers = filteredSuppliers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setPage(1); // Reset to first page
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
      <Row className="align-items-center mb-3">
        <Col>
          <SearchInput
            type="text"
            placeholder="Search suppliers"
            onChange={(e) => debouncedSearch(e)}
          />
        </Col>
        <Col>
          <Form.Group controlId="filterStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              multiple
              onChange={(e) =>
                setFilterStatus(
                  [...e.target.selectedOptions].map(
                    (option) => option.value
                  )
                )
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending Approval</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col className="text-right">
          <Button variant="primary" onClick={() => handleShowModal()}>
            Add Supplier
          </Button>
          <Button
            variant="secondary"
            className="ml-2"
            onClick={handleBulkAction}
          >
            Apply Bulk Action
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="itemsPerPageSelect">
            <Form.Label>Items per page:</Form.Label>
            <Form.Control
              as="select"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    setSelectedSuppliers(
                      filteredSuppliers.map(
                        (supplier) => supplier._id
                      )
                    );
                  } else {
                    setSelectedSuppliers([]);
                  }
                }}
              />
            </th>
            <SortableHeader onClick={() => handleSortChange('_id')}>
              ID
            </SortableHeader>
            <SortableHeader onClick={() => handleSortChange('name')}>
              Name
            </SortableHeader>
            <SortableHeader
              onClick={() => handleSortChange('contactInfo')}
            >
              Contact Info
            </SortableHeader>
            <SortableHeader
              onClick={() => handleSortChange('address')}
            >
              Address Info
            </SortableHeader>
            <SortableHeader
              onClick={() => handleSortChange('status')}
            >
              Status
            </SortableHeader>
            <SortableHeader
              onClick={() => handleSortChange('rating')}
            >
              Rating
            </SortableHeader>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedSuppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedSuppliers.includes(supplier._id)}
                  onChange={(e) => handleBulkSelect(e, supplier._id)}
                />
              </td>
              <td>{supplier._id}</td>
              <td>
                <Form.Control
                  type="text"
                  value={supplier.name}
                  onChange={(e) =>
                    handleInlineEdit(
                      supplier._id,
                      'name',
                      e.target.value
                    )
                  }
                />
              </td>
              <td>{supplier.contactInfo}</td>
              <td>{supplier.address}</td>
              <td>{supplier.status}</td>
              <td>{supplier.rating || 'No rating'}</td>
              <td>
                <Link to={`/suppliers/${supplier._id}`}>
                  <Button variant="info" className="mr-2">
                    View Details
                  </Button>
                </Link>
                <Button
                  variant="info"
                  className="mr-2"
                  onClick={() => handleShowModal(supplier)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteSupplier(supplier._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({
          length: Math.ceil(filteredSuppliers.length / itemsPerPage),
        }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === page}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentSupplier ? 'Edit Supplier' : 'Add Supplier'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="general" id="supplier-details-tabs">
            <Tab eventKey="general" title="General Info">
              <Form>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentSupplier?.name || ''}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        name: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="contactInfo">
                  <Form.Label>Contact Info</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentSupplier?.contactInfo || ''}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        contactInfo: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentSupplier?.address || ''}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        address: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={currentSupplier?.status || 'Active'}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending Approval</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Tab>
            <Tab eventKey="products" title="Products">
              <Form.Group controlId="products">
                <Form.Label>Products</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={currentSupplier?.products || []}
                  onChange={(e) =>
                    setCurrentSupplier({
                      ...currentSupplier,
                      products: Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      ),
                    })
                  }
                >
                  {/* Example product options */}
                  <option value="Product1">Product 1</option>
                  <option value="Product2">Product 2</option>
                  <option value="Product3">Product 3</option>
                </Form.Control>
              </Form.Group>
            </Tab>
            <Tab eventKey="activityLog" title="Activity Log">
              <ul>
                {currentSupplier?.activityLog?.map((log, index) => (
                  <li key={index}>
                    {log.timestamp} - {log.message}
                  </li>
                ))}
              </ul>
            </Tab>
            <Tab eventKey="reviews" title="Reviews">
              <div>
                <h5>
                  Rating:{' '}
                  {currentSupplier?.rating || 'No ratings yet'}
                </h5>
                <Form.Group controlId="rating">
                  <Form.Label>Rate Supplier</Form.Label>
                  <Form.Control
                    as="select"
                    value={currentSupplier?.rating || ''}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        rating: e.target.value,
                      })
                    }
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Terrible</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="review">
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={currentSupplier?.review || ''}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        review: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSaveReview}>
                  Submit Review
                </Button>
              </div>
              <ul>
                {currentSupplier?.reviews?.map((review, index) => (
                  <li key={index}>
                    {review.comment} - Rated: {review.rating}
                  </li>
                ))}
              </ul>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveSupplier}>
            Save Supplier
          </Button>
        </Modal.Footer>
      </Modal>
    </StyledContainer>
  );
};

export default SupplierManagement;
