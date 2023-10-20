import {test, expect} from '@playwright/test';
import {createTestUser, deleteTestUser, deleteAllTestUsers} from "./testUtilities/testUtilities";

let usernameField;
let passwordField;
let loginButton;
let registerButton;
let progressBar;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test.describe('Testing login page', () => {

  test.beforeAll(async () => {
    await deleteAllTestUsers();
  });


  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8081/login');
    // Delay is set for give time for the page to be completely loaded
    await delay(1000);
    usernameField = page.locator('input[title="Input username"]');
    passwordField = page.locator('input[title="Input password"]');
    loginButton = await page.getByRole('button', {name: 'Login'});
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
    await usernameField.fill('frontendUnitTest');
    await passwordField.fill('unitTest#0001');
    await expect(loginButton).toBeEnabled();
    await loginButton.click();

    await page.waitForURL("http://localhost:8081/home",{ timeout: 5000 });
    expect(page.url()).toBe("http://localhost:8081/home");
    await deleteTestUser();

  });
  test('Login with username field starts with number', async ({page}) => {
    await usernameField.fill('2validUsername');
    await passwordField.fill('valid1_Password');
    await expect(loginButton).toBeDisabled();
  });
  test('Login with username field contains special character', async ({page}) => {
    await usernameField.fill('valid%Username');
    await passwordField.fill('valid1_Password');
    await expect(loginButton).toBeDisabled();
  });
  test('Login with username field contains whitespace character', async ({page}) => {
    await usernameField.fill('valid Username');
    await passwordField.fill('valid1_Password');
    await expect(loginButton).toBeDisabled();
  });
  test('Login with username field is too short', async ({page}) => {
    const usernameField = page.locator('input[title="Input username"]');
    const passwordField = page.locator('input[title="Input password"]');
    await usernameField.fill('val');
    await passwordField.fill('valid1_Password')
    await expect(loginButton).toBeDisabled();
  });
  test('Login with username field is too long', async ({page}) => {
    await usernameField.fill('validUsernameShouldNotBeThis');
    await passwordField.fill('valid1_Password');
    await expect(loginButton).toBeDisabled();
  });
  test('Login with password field does not contain capital letter', async ({page}) => {
    await usernameField.fill('validUsername');
    await passwordField.fill('valid1_password');
    await expect(loginButton).toBeDisabled();
  });
  test('Login with password field does not contain number', async ({page}) => {
    await usernameField.fill('validUsername');
    await passwordField.fill('valid_Password');
    await expect(loginButton).toBeDisabled();
  });
  test('Login with password field does not contain special character', async ({page}) => {
    await usernameField.fill('validUsername');
    await passwordField.fill('valid1Password');
    await expect(loginButton).toBeDisabled();
  });
  test('Login with password field is too short', async ({page}) => {
    await usernameField.fill('validUsername');
    await passwordField.fill('val1#Pa');;
    await expect(loginButton).toBeDisabled();
  });
  test('Login with password field is too long', async ({page}) => {
    await usernameField.fill('validUsername');
    await passwordField.fill('This_Password_1s_not_valid');
    await expect(loginButton).toBeDisabled();
  });
});

test.describe('Testing register page', () => {

  test.beforeAll(async () => {
    await deleteAllTestUsers();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8081/register');
    // Delay is set for give time for the page to be completely loaded
    await delay(1000);
    usernameField = page.locator('input[title="Input username"]');
    passwordField = page.locator('input[title="Input password"]');
    registerButton = await page.getByRole('button', {name: 'Register'});
    progressBar = await page.locator('.my-4');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });


  test('Register page should be rendered', async ({page}) => {
    const loginText = page.locator('text=Already having an account? Click here to login!').first();
    expect(loginText).toBeDefined();
  });

  test('Register with valid credentials', async ({page}) => {
    await usernameField.fill('frontendUnitTest');
    await passwordField.fill('unitTest#0001');
    const progressBarValue = await progressBar.getAttribute('aria-valuenow');
    await expect(progressBarValue).toBe("4");
    await expect(registerButton).toBeEnabled();
    await registerButton.click();

    await page.waitForURL("http://localhost:8081/login",{ timeout: 5000 });
    expect(page.url()).toBe("http://localhost:8081/login");
    await deleteTestUser();

  });
  test('Register with username field starts with number', async ({page}) => {
    await usernameField.fill('2validUsername');
    await passwordField.fill('valid1_Password');
    const progressBarValue = await progressBar.getAttribute('aria-valuenow');
    await expect(progressBarValue).toBe("4");
    await expect(registerButton).toBeDisabled();
  });
  test('Register with username field contains special character', async ({page}) => {
    await usernameField.fill('valid%Username');
    await passwordField.fill('valid1_Password');
    const progressBarValue = await progressBar.getAttribute('aria-valuenow');
    await expect(progressBarValue).toBe("4");
    await expect(registerButton).toBeDisabled();
  });
  test('Register with username field contains whitespace character', async ({page}) => {
    await usernameField.fill('valid Username');
    await passwordField.fill('valid1_Password');
    const progressBarValue = await progressBar.getAttribute('aria-valuenow');
    await passwordField.fill('valid1_Password');
    await expect(progressBarValue).toBe("4");
    await expect(registerButton).toBeDisabled();
  });
  test('Register with username field is too short', async ({page}) => {
    await usernameField.fill('val');
    await passwordField.fill('valid1_Password')
    const progressBarValue = await progressBar.getAttribute('aria-valuenow');
    await expect(progressBarValue).toBe("4");
    await expect(registerButton).toBeDisabled();
  });
  test('Register with username field is too long', async ({page}) => {
    await usernameField.fill('validUsernameShouldNotBeThis');
    await passwordField.fill('valid1_Password');
    const progressBarValue = await progressBar.getAttribute('aria-valuenow');
    await expect(progressBarValue).toBe("4");
    await expect(registerButton).toBeDisabled();
  });
  test('Register with password field does not contain capital letter', async ({page}) => {
    await usernameField.fill('validUsername');
    await passwordField.fill('valid1_password');
    const progressBarValue = await progressBar.getAttribute('aria-valuenow');
    await expect(progressBarValue).toBe("3");
    await expect(registerButton).toBeDisabled();
  });
  test('Register with password field does not contain number', async ({page}) => {
    await usernameField.fill('validUsername');
    await passwordField.fill('valid_Password');
    const progressBarValue = await progressBar.getAttribute('aria-valuenow');
    await expect(progressBarValue).toBe("3");
    await expect(registerButton).toBeDisabled();
  });
  test('Register with password field does not contain special character', async ({page}) => {
    await usernameField.fill('validUsername');
    await passwordField.fill('valid1Password');
    const progressBarValue = await progressBar.getAttribute('aria-valuenow');
    await expect(progressBarValue).toBe("3");
    await expect(registerButton).toBeDisabled();
  });
  test('Register with password field is too short', async ({page}) => {
    await usernameField.fill('validUsername');
    await passwordField.fill('val1#Pa');
    const progressBarValue = await progressBar.getAttribute('aria-valuenow');
    await expect(progressBarValue).toBe("3");
    await expect(registerButton).toBeDisabled();
  });
  test('Register with password field is too long', async ({page}) => {
    await usernameField.fill('validUsername');
    await passwordField.fill('This_Password_1s_not_valid');
    const progressBarValue = await progressBar.getAttribute('aria-valuenow');
    await expect(progressBarValue).toBe("3");
    await expect(registerButton).toBeDisabled();
  });
});

test.describe('Testing home page', () => {

  test.beforeAll(async () => {
    await deleteAllTestUsers();
  });


  test.beforeEach(async ({page}) => {
    await createTestUser();
    await page.goto('http://localhost:8081/login');
    // Delay is set for give time for the page to be completely loaded
    await delay(1000);
  });

  test.afterEach(async ({page}) => {
    await deleteTestUser();
    await page.close();
  });


  test('Home page should be rendered & should be able to logout', async ({page}) => {
    const usernameField = page.locator('input[title="Input username"]');
    const passwordField = page.locator('input[title="Input password"]');
    await usernameField.fill('frontendUnitTest');
    await passwordField.fill('unitTest#0001');
    const loginButton = await page.getByRole('button', {name: 'Login'});
    await expect(loginButton).toBeEnabled();
    await loginButton.click();

    await page.waitForURL("http://localhost:8081/home",{ timeout: 5000 });
    expect(page.url()).toBe("http://localhost:8081/home");
    const homeText = page.locator('text=Hello, frontendUnitTest').first();
    expect(homeText).toBeDefined();
    const jwtToken = await page.evaluate(() => {
      return localStorage.getItem('jwt');
    });
    expect(jwtToken).not.toEqual('');
    const greetingButton = await page.getByRole('button', {name: 'Hello, frontendUnitTest'});
    await greetingButton.click();
    const logoutLink = await page.locator('a',{hasText: 'Logout'});
    await logoutLink.click();
    await page.waitForURL("http://localhost:8081/login",{ timeout: 5000 });
    expect(page.url()).toBe("http://localhost:8081/login");
    const emptyJwtToken = await page.evaluate(() => {
      return localStorage.getItem('jwt');
    });
    expect(emptyJwtToken).toEqual(null);

  });


});
