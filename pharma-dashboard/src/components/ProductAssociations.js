import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import CustomModal from './CustomModal'; // Import the reusable modal

const ProductAssociations = ({ supplier, setSupplier }) => {
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState('');

  const handleShowProductModal = () => {
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
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
        <h5>Product Associations</h5>
        <Button variant="primary" onClick={handleShowProductModal}>
          Add Product
        </Button>
      </Card.Header>
      <Card.Body>
        {supplier.products?.length > 0 ? (
          <ul>
            {supplier.products.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        ) : (
          <p>No products associated with this supplier.</p>
        )}
      </Card.Body>

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

export default ProductAssociations;
