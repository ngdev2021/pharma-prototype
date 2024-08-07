// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/users">User Management</Link>
        </li>
        <li>
          <Link to="/inventory">Inventory Management</Link>
        </li>
        <li>
          <Link to="/orders">Order Management</Link>
        </li>
        <li>
          <Link to="/suppliers">Supplier Management</Link>
        </li>
        <li>
          <Link to="/fda-data">FDA Data Management</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
