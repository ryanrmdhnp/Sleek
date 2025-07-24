import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Flow', () => {
  test('required field validation', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    let email = '';
    await login.loginemail(email);
    await login.expectUsernameEmpty();

    email = 'test@example.com';
    await login.loginemail(email);

    const password = '';
    await login.loginpassword(password);
    await login.expectPasswordEmpty();
  });

  test('should show error on invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    const email = 'test@example.com';
    const password = 'wrongpassword';
    await login.login(email, password);
    await login.expectLoginFailure();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    const email = 'test@example.com';
    const password = 'Test123!';
    await login.login(email, password);
    await login.expectLoginSuccess();
  });
});