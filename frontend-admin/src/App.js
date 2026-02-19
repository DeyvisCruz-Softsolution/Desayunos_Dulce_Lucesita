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



const App = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-main">
        <Navbar />
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route
              path="/"
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
            <Route path="/login" element={<Login />} />
            <Route
              path="/promotions"
              element={
                <PrivateRoute roles={['admin']}>
                  <AdminPromotionsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
