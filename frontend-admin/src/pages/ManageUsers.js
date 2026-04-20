import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/userService';
import UserTable from '../components/UserTable';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar usuarios');
      }
    };

    load();
  }, []);

  return (
    <div>
      <h2>Usuarios</h2>
      {error && <p>{error}</p>}
      <UserTable users={users} />
    </div>
  );
};

export default ManageUsers;