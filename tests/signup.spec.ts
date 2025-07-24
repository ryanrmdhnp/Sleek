import { test, expect } from '@playwright/test';

test.describe('Signup Flow', () => {
  test('required field validation', async ({ page }) => {
    await page.goto('https://sso.sleekflow.io/u/login/identifier?state=hKFo2SBuYWpYN0hmZWZQWTlvaTBubEpxT2RRbE1Ic3ZhZVhhaaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDFYNnRVVDlpMExqYUdRSHNxT28tbVlmdlE4RUVKUUJ1o2NpZNkgQ2xWMG9QSURYUDM3Zk5vTWtHUDhzT21hM29maTE3TTc&ui_locales=en-US');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByRole('button', { name: 'Sign up' }).click();
    const emailInput = page.locator('input[name="email"]');
    const isValid = await emailInput.evaluate((input: HTMLInputElement) => input.checkValidity());
    expect(isValid).toBe(false);
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('test123@example.com');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByRole('button', { name: 'Sign up' }).click();
    const usernameInput = page.locator('input[name="username"]');
    const isValid2 = await usernameInput.evaluate((input: HTMLInputElement) => input.checkValidity());
    expect(isValid2).toBe(false);
  });

  test('email format validation', async ({ page }) => {
    await page.goto('https://sso.sleekflow.io/u/login/identifier?state=hKFo2SBuYWpYN0hmZWZQWTlvaTBubEpxT2RRbE1Ic3ZhZVhhaaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDFYNnRVVDlpMExqYUdRSHNxT28tbVlmdlE4RUVKUUJ1o2NpZNkgQ2xWMG9QSURYUDM3Zk5vTWtHUDhzT21hM29maTE3TTc&ui_locales=en-US');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('test123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.locator('text=Email is not valid')).toBeVisible();
  });

  test('password strength enforcement', async ({ page }) => {
    await page.goto('https://sso.sleekflow.io/u/login/identifier?state=hKFo2SBuYWpYN0hmZWZQWTlvaTBubEpxT2RRbE1Ic3ZhZVhhaaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDFYNnRVVDlpMExqYUdRSHNxT28tbVlmdlE4RUVKUUJ1o2NpZNkgQ2xWMG9QSURYUDM3Zk5vTWtHUDhzT21hM29maTE3TTc&ui_locales=en-US');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('test12345@example.com');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('test123');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('test123');
    await page.getByRole('button', { name: 'Sign up' }).click();
    const passwordWrapper = page.locator('.c141f6ee9.ca2723af5.password.c2f342594');
    await expect(passwordWrapper).toBeVisible(); // ✅ Confirm it's on the page
    await expect(passwordWrapper).toHaveCSS('border-color', 'rgb(208, 14, 23)');
  });

  test('duplicate email', async ({ page }) => {
    await page.goto('https://sso.sleekflow.io/u/login/identifier?state=hKFo2SBuYWpYN0hmZWZQWTlvaTBubEpxT2RRbE1Ic3ZhZVhhaaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDFYNnRVVDlpMExqYUdRSHNxT28tbVlmdlE4RUVKUUJ1o2NpZNkgQ2xWMG9QSURYUDM3Zk5vTWtHUDhzT21hM29maTE3TTc&ui_locales=en-US');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('test@example.com');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('testexample');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Test123!');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.locator('text=We couldn’t complete your registration. Please try again or contact us for support.')).toBeVisible();
  });

  test('should successfully sign up with valid credentials', async ({ page }) => {
    const timestamp = Date.now();
    const email = `testuser+${timestamp}@example.com`;
    const username = `testuser+${timestamp}`;
    const password = 'Test123!';

    await page.goto('https://sso.sleekflow.io/u/login/identifier?state=hKFo2SBuYWpYN0hmZWZQWTlvaTBubEpxT2RRbE1Ic3ZhZVhhaaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDFYNnRVVDlpMExqYUdRSHNxT28tbVlmdlE4RUVKUUJ1o2NpZNkgQ2xWMG9QSURYUDM3Zk5vTWtHUDhzT21hM29maTE3TTc&ui_locales=en-US');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill(email);
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.goto('https://v1.sleekflow.io/en-US/setup-company');
  });
});