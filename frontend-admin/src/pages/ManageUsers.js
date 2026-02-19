import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/userService';
import UserTable from '../components/UserTable';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <div>
      <h2>Usuarios</h2>
      <UserTable users={users} />
    </div>
  );
};

export default ManageUsers;
