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

// 🔥 DASHBOARDS
import DashboardPage from './pages/DashboardPage'; // viejo (respaldo)
import DashboardV2 from './pages/DashboardV2';     // nuevo (principal)

const App = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-main">
        <Navbar />

        <main style={{ padding: '20px' }}>
          <Routes>

            {/* 🔥 DASHBOARD NUEVO (PRINCIPAL) */}
            <Route
              path="/"
              element={
                <PrivateRoute roles={['admin']}>
                  <DashboardV2 />
                </PrivateRoute>
              }
            />

            {/* 🧠 DASHBOARD ANTIGUO (OPCIONAL / RESPALDO) */}
            <Route
              path="/dashboard-old"
              element={
                <PrivateRoute roles={['admin']}>
                  <DashboardPage />
                </PrivateRoute>
              }
            />

            {/* PRODUCTOS */}
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

            {/* PEDIDOS */}
            <Route
              path="/orders"
              element={
                <PrivateRoute roles={['admin']}>
                  <ManageOrders />
                </PrivateRoute>
              }
            />

            {/* USUARIOS */}
            <Route
              path="/users"
              element={
                <PrivateRoute roles={['admin']}>
                  <ManageUsers />
                </PrivateRoute>
              }
            />

            {/* PROMOCIONES */}
            <Route
              path="/promotions"
              element={
                <PrivateRoute roles={['admin']}>
                  <AdminPromotionsPage />
                </PrivateRoute>
              }
            />

            {/* LOGIN */}
            <Route path="/login" element={<Login />} />

          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;