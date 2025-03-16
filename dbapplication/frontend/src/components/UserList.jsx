import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const UserList = ({ onEditUser, onDeleteUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // fetchを使ってサーバーからユーザーリストを取得
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, [users]);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          onDeleteUser(id);
        }
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <h2>User List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <Button variant="warning" onClick={() => onEditUser(user)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
