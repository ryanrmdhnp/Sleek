// pages/LoginPage.ts
import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://sso.sleekflow.io/u/login/identifier?state=hKFo2SBvc0w3YlBYQS1hRFV0ZFpNU2xXX0IxZVZfR3Z3N2ZXeKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIGE1MmstMEUyX25UVU80cTZQeWN2OFNsRzdySmVfTEZ4o2NpZNkgQ2xWMG9QSURYUDM3Zk5vTWtHUDhzT21hM29maTE3TTc&ui_locales=en');
  }

  async login(email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Email or username' }).fill(email);
    await this.page.getByRole('button', { name: 'Continue', exact: true }).click();
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }
  
  async loginemail(email: string) {
    await this.page.getByRole('textbox', { name: 'Email or username' }).fill(email);
    await this.page.getByRole('button', { name: 'Continue', exact: true }).click();
  }

  async loginpassword(password: string) {
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL('https://v1.sleekflow.io/en-US/setup-company');
  }

  async expectLoginFailure() {
    await expect(this.page.locator('text=Wrong username or password')).toBeVisible();
  }

  async expectUsernameEmpty() {
    const emailusernameInput = this.page.locator('input[name="username"]');
    const isValid = await emailusernameInput.evaluate((input: HTMLInputElement) => input.checkValidity());
    expect(isValid).toBe(false);
  }

  async expectPasswordEmpty() {
    const passwordInput = this.page.locator('input[name="password"]');
    const isValid2 = await passwordInput.evaluate((input: HTMLInputElement) => input.checkValidity());
    expect(isValid2).toBe(false);
  }
}
