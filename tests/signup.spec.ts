import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';

test.describe('Signup Flow', () => {
  test('required field validation', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.goto();
    await signup.submit();
    await signup.expectEmailValidationError();

    const email = `test+${Date.now()}@example.com`;
    await signup.fillSignupForm1(email);
    await signup.submit();
    await signup.expectUsernameValidationError();
  });

  test('email format validation', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.goto();

    const email = `test+${Date.now()}`;
    await signup.fillSignupForm1(email);
    await signup.submit();
    await signup.expectEmailNotValidValidationError();
  });

  test('password strength enforcement', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.goto();

    const email = `test+${Date.now()}@example.com`;
    await signup.fillSignupForm1(email);
    await signup.submit();

    const username = `testuser+${Date.now()}`;
    const password = 'test123';
    await signup.fillSignupForm2(username, password);
    await signup.submit();
    await signup.expectPasswordStrengthValidationError();
  });

  test('duplicate email', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.goto();

    const email = `test@example.com`;
    await signup.fillSignupForm1(email);
    await signup.submit();

    const username = `testuser${Date.now()}`;
    const password = 'Test123!';
    await signup.fillSignupForm2(username, password);
    await signup.submit();
    await signup.expectDuplicateEmailValidationError();
  });

  test('should successfully sign up with valid credentials', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.goto();

    const email = `test${Date.now()}@example.com`;
    await signup.fillSignupForm1(email);
    await signup.submit();

    const username = `testuser${Date.now()}`;
    const password = 'Test123!';
    await signup.fillSignupForm2(username, password);
    await signup.submit();
    await signup.expectRedirectToSetup();
  });
});