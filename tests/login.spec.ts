import { test, expect } from '@playwright/test';
import { login } from '../utils/loginHelper';

test.describe('Login Flow', () => {
  test('required field validation', async ({ page }) => {
    await page.goto('https://sso.sleekflow.io/u/login/identifier?state=hKFo2SBvc0w3YlBYQS1hRFV0ZFpNU2xXX0IxZVZfR3Z3N2ZXeKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIGE1MmstMEUyX25UVU80cTZQeWN2OFNsRzdySmVfTEZ4o2NpZNkgQ2xWMG9QSURYUDM3Zk5vTWtHUDhzT21hM29maTE3TTc&ui_locales=en');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    const emailusernameInput = page.locator('input[name="username"]');
    const isValid = await emailusernameInput.evaluate((input: HTMLInputElement) => input.checkValidity());
    expect(isValid).toBe(false);
    await page.getByRole('textbox', { name: 'Email or username' }).click();
    await page.getByRole('textbox', { name: 'Email or username' }).fill('test@example.com');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByRole('button', { name: 'Sign in' }).click();
    const passwordInput = page.locator('input[name="password"]');
    const isValid2 = await passwordInput.evaluate((input: HTMLInputElement) => input.checkValidity());
    expect(isValid2).toBe(false);
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('https://sso.sleekflow.io/u/login/identifier?state=hKFo2SBvc0w3YlBYQS1hRFV0ZFpNU2xXX0IxZVZfR3Z3N2ZXeKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIGE1MmstMEUyX25UVU80cTZQeWN2OFNsRzdySmVfTEZ4o2NpZNkgQ2xWMG9QSURYUDM3Zk5vTWtHUDhzT21hM29maTE3TTc&ui_locales=en');
    await page.getByRole('textbox', { name: 'Email or username' }).click();
    await page.getByRole('textbox', { name: 'Email or username' }).fill('test@example.com');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Test');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.locator('text=Wrong username or password')).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const email = 'test@example.com';
    const password = 'Test123!';

    await login(page, email, password);
    await expect(page).toHaveURL('https://v1.sleekflow.io/en-US/setup-company');
  });
});