import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const EditUserForm = ({ userToEdit, onUserUpdated }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (userToEdit) {
      setFirstName(userToEdit.firstName);
      setLastName(userToEdit.lastName);
      setPhoneNumber(userToEdit.phoneNumber);
    }
  }, [userToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = { firstName, lastName, phoneNumber };

    // fetchを使ってユーザー情報を更新
    fetch(`http://localhost:3000/users/${userToEdit.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(response => response.json())
      .then(data => {
        onUserUpdated(data);  // 親コンポーネントに更新されたユーザーを渡す
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>
      <h2>Edit User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Update User</Button>
      </Form>
    </div>
  );
};

export default EditUserForm;
