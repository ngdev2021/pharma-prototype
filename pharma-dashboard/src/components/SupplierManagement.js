// src/components/SupplierManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/suppliers')
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error(
          'There was an error fetching the suppliers!',
          error
        );
      });
  }, []);

  return (
    <div>
      <h1>Supplier Management</h1>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier._id}>
            {supplier.name} - {supplier.contactInfo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierManagement;
