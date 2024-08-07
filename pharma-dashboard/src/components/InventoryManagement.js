// src/components/InventoryManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/inventory')
      .then((response) => {
        setInventory(response.data);
      })
      .catch((error) => {
        console.error(
          'There was an error fetching the inventory!',
          error
        );
      });
  }, []);

  return (
    <div>
      <h1>Inventory Management</h1>
      <ul>
        {inventory.map((item) => (
          <li key={item._id}>
            {item.itemName} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManagement;
