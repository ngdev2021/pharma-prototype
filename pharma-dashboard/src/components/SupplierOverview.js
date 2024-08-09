import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import CustomModal from './CustomModal'; // Import the reusable modal
import axios from 'axios';

const SupplierOverview = ({ supplier, setSupplier }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState('');

  const handleShowEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleShowProductModal = () => {
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
  };

  const handleSaveSupplier = async () => {
    if (supplier._id) {
      await axios.put(
        `http://localhost:5000/api/suppliers/${supplier._id}`,
        supplier,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );
    }
    handleCloseEditModal();
    const response = await axios.get(
      `http://localhost:5000/api/suppliers/${supplier._id}`,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      }
    );
    setSupplier(response.data);
  };

  const handleAddProduct = () => {
    setSupplier({
      ...supplier,
      products: [...(supplier.products || []), newProduct],
    });
    setNewProduct('');
    handleCloseProductModal();
  };

  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <h4 className="mb-0">{supplier.name}</h4>
          <small
            className={`text-${
              supplier.status === 'Active' ? 'success' : 'warning'
            }`}
          >
            {supplier.status}
          </small>
        </div>
        <div>
          <Button
            variant="info"
            onClick={handleShowEditModal}
            className="mr-2"
          >
            Edit Supplier
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Contact Info:</strong> {supplier.contactInfo}
        </Card.Text>
        <Card.Text>
          <strong>Address:</strong> {supplier.address}
        </Card.Text>
        <Card.Text>
          <strong>Rating:</strong>{' '}
          {supplier.rating || 'No rating available'}
        </Card.Text>
        <Card.Text>
          <strong>Products:</strong>{' '}
          {supplier.products?.join(', ') || 'No products associated'}
        </Card.Text>
      </Card.Body>

      {/* Reusable Edit Modal */}
      <CustomModal
        show={showEditModal}
        onHide={handleCloseEditModal}
        title="Edit Supplier"
        onSave={handleSaveSupplier}
      >
        {/* Modal content */}
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={supplier?.name || ''}
              onChange={(e) =>
                setSupplier({
                  ...supplier,
                  name: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="contactInfo">
            <Form.Label>Contact Info</Form.Label>
            <Form.Control
              type="text"
              value={supplier?.contactInfo || ''}
              onChange={(e) =>
                setSupplier({
                  ...supplier,
                  contactInfo: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={supplier?.address || ''}
              onChange={(e) =>
                setSupplier({
                  ...supplier,
                  address: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={supplier?.status || 'Active'}
              onChange={(e) =>
                setSupplier({
                  ...supplier,
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
      </CustomModal>

      {/* Reusable Add Product Modal */}
      <CustomModal
        show={showProductModal}
        onHide={handleCloseProductModal}
        title="Add Product"
        onSave={handleAddProduct}
      >
        <Form.Group controlId="newProduct">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
          />
        </Form.Group>
      </CustomModal>
    </Card>
  );
};

export default SupplierOverview;
