// src/App.js
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LandingPage from './components/LandingPage';
import UserManagement from './components/UserManagement';
import OrderManagement from './components/OrderManagement';
import FDADataManagement from './components/FDADataManagement';
import SupplierManagement from './components/SupplierManagement';
import InventoryManagement from './components/InventoryManagement';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import SupplierDetailsPage from './components/SupplierDetailsPage';
import UserDetailsPage from './components/UserDetailsPage';
import FDAData from './components/FDADataManagement';
import Dashboard from './components/Dashboard';

import FDAShortageDetail from './components/FDAShortageDetail';

import './App.css';

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser.user);
    }
  }, [token]);

  const setAuthToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  return (
    <Router>
      <Navbar
        isLoggedIn={!!token}
        user={user}
        onLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/login"
          element={<Login setToken={setAuthToken} />}
        />
        <Route
          path="/register"
          element={<Register setToken={setAuthToken} />}
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard token={token} user={user} />
            // <PrivateRoute component={Dashboard} token={token} />
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute component={UserManagement} token={token} />
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute component={OrderManagement} token={token} />
          }
        />
        <Route
          path="/fda-data"
          element={
            <PrivateRoute
              component={FDADataManagement}
              token={token}
            />
          }
        />
        <Route
          path="/fda-shortages"
          element={<PrivateRoute component={FDAData} token={token} />}
        />
        <Route
          path="/fda-shortages/:id"
          element={
            <PrivateRoute
              component={FDAShortageDetail}
              token={token}
            />
          }
        />

        <Route
          path="/suppliers"
          element={
            <PrivateRoute
              component={SupplierManagement}
              token={token}
            />
          }
        />
        <Route
          path="/suppliers/:id"
          element={
            <PrivateRoute
              component={SupplierDetailsPage}
              token={token}
            />
          }
        />
        <Route
          path="/inventory"
          element={
            <PrivateRoute
              component={InventoryManagement}
              token={token}
            />
          }
        />
        <Route
          path="/users/:id"
          element={
            <PrivateRoute component={UserDetailsPage} token={token} />
          }
        />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
