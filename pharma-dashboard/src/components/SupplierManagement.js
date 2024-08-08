// src/components/SupplierManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5000/api/suppliers',
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );
        setSuppliers(response.data);
      } catch (error) {
        setError(error);
        console.error(
          'There was an error fetching the suppliers!',
          error
        );
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div>
      <h1>Supplier Management</h1>
      {error && <p>There was an error fetching the suppliers!</p>}
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier._id}>
            Supplier ID: {supplier._id}, Name: {supplier.name},
            Contact: {supplier.contactInfo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierManagement;
