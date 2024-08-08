import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import UserManagement from './components/UserManagement';
import OrderManagement from './components/OrderManagement';
import FDADataManagement from './components/FDADataManagement';
import SupplierManagement from './components/SupplierManagement';
import InventoryManagement from './components/InventoryManagement';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  );

  const setAuthToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <Router>
      <Navbar token={token} handleLogout={handleLogout} />
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
          path="/suppliers"
          element={
            <PrivateRoute
              component={SupplierManagement}
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
          path="/"
          element={<div>Welcome to Pharma Prototype Dashboard</div>}
        />
      </Routes>
    </Router>
  );
};

export default App;
