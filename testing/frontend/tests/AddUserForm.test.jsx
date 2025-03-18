// npx vitest
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AddUserForm from '../src/components/AddUserForm';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ firstName: 'John', lastName: 'Doe', phoneNumber: '123456789' }),
  })
);

describe('AddUserForm', () => {
  it('should update input fields correctly', () => {
    render(<AddUserForm onUserAdded={vi.fn()} />);

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const phoneNumberInput = screen.getByLabelText(/Phone Number/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(phoneNumberInput, { target: { value: '123456789' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(phoneNumberInput.value).toBe('123456789');
  });

  it('should call fetch and onUserAdded on form submit', async () => {
    const onUserAddedMock = vi.fn();
    render(<AddUserForm onUserAdded={onUserAddedMock} />);

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '123456789' } });

    fireEvent.click(screen.getByText(/Add User/i));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/add-user', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: 'John', lastName: 'Doe', phoneNumber: '123456789' }),
      }));
      expect(onUserAddedMock).toHaveBeenCalledTimes(1);
      expect(onUserAddedMock).toHaveBeenCalledWith({ firstName: 'John', lastName: 'Doe', phoneNumber: '123456789' });
    });

    // フォームの入力がリセットされているか確認
    expect(screen.getByLabelText(/First Name/i).value).toBe('');
    expect(screen.getByLabelText(/Last Name/i).value).toBe('');
    expect(screen.getByLabelText(/Phone Number/i).value).toBe('');
  });
});
