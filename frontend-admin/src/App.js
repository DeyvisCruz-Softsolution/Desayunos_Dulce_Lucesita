import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ManageProducts from './pages/ManageProducts';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ManageOrders from './pages/ManageOrders';
import ManageUsers from './pages/ManageUsers';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import PrivateRoute from './PrivateRoute';
import AdminPromotionsPage from './pages/AdminPromotionsPage';

import DashboardPage from './pages/DashboardPage';
import DashboardV2 from './pages/DashboardV2';

const App = () => {
  return (
    <div style={{ display: 'flex' }}>

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENIDO */}
      <div className="main-content">

        <Navbar />

        <main className="main-inner">
          <Routes>

            <Route
              path="/"
              element={
                <PrivateRoute roles={['admin']}>
                  <DashboardV2 />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard-old"
              element={
                <PrivateRoute roles={['admin']}>
                  <DashboardPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/products"
              element={
                <PrivateRoute roles={['admin']}>
                  <ManageProducts />
                </PrivateRoute>
              }
            />

            <Route
              path="/products/add"
              element={
                <PrivateRoute roles={['admin']}>
                  <AddProduct />
                </PrivateRoute>
              }
            />

            <Route
              path="/products/edit/:id"
              element={
                <PrivateRoute roles={['admin']}>
                  <EditProduct />
                </PrivateRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <PrivateRoute roles={['admin']}>
                  <ManageOrders />
                </PrivateRoute>
              }
            />

            <Route
              path="/users"
              element={
                <PrivateRoute roles={['admin']}>
                  <ManageUsers />
                </PrivateRoute>
              }
            />

            <Route
              path="/promotions"
              element={
                <PrivateRoute roles={['admin']}>
                  <AdminPromotionsPage />
                </PrivateRoute>
              }
            />

            <Route path="/login" element={<Login />} />

          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;