import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import UserManagement from './components/UserManagement';
import InventoryManagement from './components/InventoryManagement';
import OrderManagement from './components/OrderManagement';
import SupplierManagement from './components/SupplierManagement';
import FDADataManagement from './components/FDADataManagement';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/users" element={<UserManagement />} />
          <Route
            path="/inventory"
            element={<InventoryManagement />}
          />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/suppliers" element={<SupplierManagement />} />
          <Route path="/fda-data" element={<FDADataManagement />} />
          <Route
            path="/"
            element={<h1>Welcome to Pharma Dashboard</h1>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
