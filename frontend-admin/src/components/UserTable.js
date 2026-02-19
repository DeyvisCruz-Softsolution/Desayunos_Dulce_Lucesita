import React from 'react';

const UserTable = ({ users }) => (
  <table>
    <thead>
      <tr><th>Nombre</th><th>Email</th><th>Rol</th></tr>
    </thead>
    <tbody>
      {users.map(u => (
        <tr key={u.id}>
          <td>{u.name}</td>
          <td>{u.email}</td>
          <td>{u.role}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTable;
