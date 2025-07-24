// pages/SignupPage.ts
import { Page, expect } from '@playwright/test';

export class SignupPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://sso.sleekflow.io/u/login/identifier?state=hKFo2SBuYWpYN0hmZWZQWTlvaTBubEpxT2RRbE1Ic3ZhZVhhaaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDFYNnRVVDlpMExqYUdRSHNxT28tbVlmdlE4RUVKUUJ1o2NpZNkgQ2xWMG9QSURYUDM3Zk5vTWtHUDhzT21hM29maTE3TTc&ui_locales=en-US');
    await this.page.getByRole('link', { name: 'Sign up' }).click();
}

  async fillSignupForm1(email: string) {
    await this.page.getByRole('textbox', { name: 'Email address' }).fill(email);
  }

  async fillSignupForm2(username: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Sign up' }).click();
  }

  async expectRedirectToSetup() {
    await expect(this.page).toHaveURL('https://v1.sleekflow.io/en-US/setup-company');
  }

  async expectEmailValidationError() {
    const emailInput = this.page.locator('input[name="email"]');
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isValid).toBe(false);
  }

  async expectUsernameValidationError() {
    const usernameInput = this.page.locator('input[name="username"]');
    const isValid = await usernameInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isValid).toBe(false);
  }

  async expectEmailNotValidValidationError() {
    await expect(this.page.locator('text=Email is not valid')).toBeVisible();
  }

  async expectPasswordStrengthValidationError() {
    const passwordWrapper = this.page.locator('.c141f6ee9.ca2723af5.password.c2f342594');
    await expect(passwordWrapper).toBeVisible();
    await expect(passwordWrapper).toHaveCSS('border-color', 'rgb(208, 14, 23)');
  }

  async expectDuplicateEmailValidationError() {
    await expect(this.page.locator('text=We couldn’t complete your registration. Please try again or contact us for support.')).toBeVisible();
  }
}
