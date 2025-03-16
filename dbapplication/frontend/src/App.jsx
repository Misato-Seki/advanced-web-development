import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddUserForm from './components/AddUserForm';
import UserList from './components/UserList';
import EditUserForm from './components/EditUserForm';

const App = () => {
  const [userToEdit, setUserToEdit] = useState(null);
  const [users, setUsers] = useState([]);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setUserToEdit(null);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <AddUserForm onUserAdded={handleAddUser} />
      <UserList onEditUser={handleEditUser} onDeleteUser={handleDeleteUser} />
      {userToEdit && <EditUserForm userToEdit={userToEdit} onUserUpdated={handleUserUpdated} />}
    </div>
  );
};

export default App;
