import React from 'react';

const DashboardStats = ({ stats }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">Productos: {stats.products}</div>
      <div className="stat-card">Pedidos: {stats.orders}</div>
      <div className="stat-card">Usuarios: {stats.users}</div>
    </div>
  );
};

export default DashboardStats;
