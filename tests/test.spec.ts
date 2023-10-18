import {test, expect} from '@playwright/test';
import {createTestUser, deleteTestUser} from "./testUtilities/testUtilities";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test.describe('Testing login page', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:8081/login');
    await delay(1000);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Login page should be rendered', async ({page}) => {
    const loginText = page.locator('text=Not a user yet? Register now.').first();
    expect(loginText).toBeDefined();
  });
  test('Login with valid credentials', async ({page}) => {
    await createTestUser();
    const usernameField = page.locator('input[title="Input username"]');
    const passwordField = page.locator('input[title="Input password"]');
    await usernameField.fill('backendUnitTest');
    await passwordField.fill('unitTest#0001');
    const loginButton = await page.getByRole('button', {name: 'Login'});
    await expect(loginButton).not.toBeDisabled();
    await loginButton.click();

    await page.waitForURL("http://localhost:8081/home",{ timeout: 5000 });
    const currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:8081/home");
    await deleteTestUser();

  });
  test('Login with username field starts with number', async ({page}) => {
    const usernameField = page.locator('input[title="Input username"]');
    const passwordField = page.locator('input[title="Input password"]');
    await usernameField.fill('2validUsername');
    await passwordField.fill('valid1_Password');

    const loginButton = await page.getByRole('button', {name: 'Login'});
    await expect(loginButton).toBeDisabled();
  });
  test('Login with username field contains special character', async ({page}) => {
    const usernameField = page.locator('input[title="Input username"]');
    const passwordField = page.locator('input[title="Input password"]');
    await usernameField.fill('valid%Username');
    await passwordField.fill('valid1_Password');

    const loginButton = await page.getByRole('button', {name: 'Login'});
    await expect(loginButton).toBeDisabled();
  });
  test('Login with username field contains whitespace character', async ({page}) => {
    const usernameField = page.locator('input[title="Input username"]');
    const passwordField = page.locator('input[title="Input password"]');
    await usernameField.fill('valid Username');
    await passwordField.fill('valid1_Password');

    const loginButton = await page.getByRole('button', {name: 'Login'});
    await expect(loginButton).toBeDisabled();
  });
  test('Login with username field is too short', async ({page}) => {
    const usernameField = page.locator('input[title="Input username"]');
    const passwordField = page.locator('input[title="Input password"]');
    await usernameField.fill('val');
    await passwordField.fill('valid1_Password')

    const loginButton = await page.getByRole('button', {name: 'Login'});
    await expect(loginButton).toBeDisabled();
  });
  test('Login with username field is too long', async ({page}) => {
    const usernameField = page.locator('input[title="Input username"]');
    const passwordField = page.locator('input[title="Input password"]');
    await usernameField.fill('validUsernameShouldNotBeThis');
    await passwordField.fill('valid1_Password');

    const loginButton = await page.getByRole('button', {name: 'Login'});
    await expect(loginButton).toBeDisabled();
  });
  test('Login with password field does not contain capital letter', async ({page}) => {
    const usernameField = page.locator('input[title="Input username"]');
    const passwordField = page.locator('input[title="Input password"]');
    await usernameField.fill('validUsername');
    await passwordField.fill('valid1_password');

    const loginButton = await page.getByRole('button', {name: 'Login'});
    await expect(loginButton).toBeDisabled();
  });
  test('Login with password field does not contain number', async ({page}) => {
    const usernameField = page.locator('input[title="Input username"]');
    const passwordField = page.locator('input[title="Input password"]');
    await usernameField.fill('validUsername');
    await passwordField.fill('valid_Password');

    const loginButton = await page.getByRole('button', {name: 'Login'});
    await expect(loginButton).toBeDisabled();
  });
  test('Login with password field does not contain special character', async ({page}) => {
    const usernameField = page.locator('input[title="Input username"]');
    const passwordField = page.locator('input[title="Input password"]');
    await usernameField.fill('validUsername');
    await passwordField.fill('valid1Password');

    const loginButton = await page.getByRole('button', {name: 'Login'});
    await expect(loginButton).toBeDisabled();
  });
  test('Login with password field is too short', async ({page}) => {
    const usernameField = page.locator('input[title="Input username"]');
    const passwordField = page.locator('input[title="Input password"]');
    await usernameField.fill('validUsername');
    await passwordField.fill('val1#Pa');

    const loginButton = await page.getByRole('button', {name: 'Login'});
    await expect(loginButton).toBeDisabled();
  });
  test('Login with password field is too long', async ({page}) => {
    const usernameField = page.locator('input[title="Input username"]');
    const passwordField = page.locator('input[title="Input password"]');
    await usernameField.fill('validUsername');
    await passwordField.fill('This_Password_1s_not_valid');

    const loginButton = await page.getByRole('button', {name: 'Login'});
    await expect(loginButton).toBeDisabled();
  });
});
