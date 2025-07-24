export async function login(page, email, password) {
  await page.goto('https://sso.sleekflow.io/u/login/identifier?state=hKFo2SBvc0w3YlBYQS1hRFV0ZFpNU2xXX0IxZVZfR3Z3N2ZXeKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIGE1MmstMEUyX25UVU80cTZQeWN2OFNsRzdySmVfTEZ4o2NpZNkgQ2xWMG9QSURYUDM3Zk5vTWtHUDhzT21hM29maTE3TTc&ui_locales=en');
  await page.getByRole('textbox', { name: 'Email or username' }).click();
  await page.getByRole('textbox', { name: 'Email or username' }).fill(email);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
}