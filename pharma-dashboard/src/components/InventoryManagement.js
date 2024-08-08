import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);

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
      } catch (error) {
        setError(error);
        console.error(
          'There was an error fetching the inventory!',
          error
        );
      }
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <h1>Inventory Management</h1>
      {error && <p>There was an error fetching the inventory!</p>}
      <ul>
        {inventory.map((item) => (
          <li key={item._id}>
            Item Name: {item.itemName}, Quantity: {item.quantity},
            Expiration Date: {item.expirationDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManagement;
