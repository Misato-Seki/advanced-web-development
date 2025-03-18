import { test, expect } from '@playwright/test';

test.describe('User Management System', () => {
  
  // Load the page before each test
  test.beforeEach(async ({ page }) => {
    // Access the local development server (change the URL according to the environment)
    await page.goto('http://localhost:5173');
  });

  // Test for adding a new user
  test('should add a new user', async ({ page }) => {
    // Fill in the input fields
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#phoneNumber', '987-654-3210');
    
    // Click the submit button
    await page.click('#addUser');
    
    // Verify that the new user has been added to the user list
    const newUserRow = await page.locator('text=John');
    await expect(newUserRow).toBeVisible();
  });

  // Test for deleting a user
  test('should delete a user', async ({ page }) => {
    // Click the delete button (delete the first user)
    const deleteButton = await page.locator('button.btn-danger').first();
    await deleteButton.click();
    
    // Verify that the user has been deleted
    const deletedUserRow = await page.locator('text=TestFirstName_jqz3is');
    await expect(deletedUserRow).not.toBeVisible();
  });

  // Test for editing an existing user
  test('should edit an existing user', async ({ page }) => {
    // Click the edit button (edit the first user)
    const editButton = await page.locator('button.btn-warning').first();
    await editButton.click();
    
    // Fill in the edit form
    await page.fill('#firstName', 'UpdatedFirstName');
    await page.fill('#lastName', 'UpdatedLastName');
    await page.fill('#phoneNumber', '111-222-3333');
    
    // Save the user information
    await page.click('#addUser');
    
    // Verify that the edited user is displayed correctly
    const updatedUserRow = await page.locator('text=UpdatedFirstName');
    await expect(updatedUserRow).toBeVisible();
  });
});
