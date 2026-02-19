import React from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>Bienvenido, {user?.name}.</p>
      <p>Usa el menú lateral para gestionar productos, pedidos y usuarios.</p>
    </div>
  );
};

export default Dashboard;
