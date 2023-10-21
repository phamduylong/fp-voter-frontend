import { test, expect } from '@playwright/test';
import { createTestUser, deleteTestUser, deleteAllTestUsers } from './testUtilities/testUtilities';
import { loginForm, registerForm, homePage } from './testUtilities/formPage';


let login: loginForm;
let register: registerForm;
let home: homePage;


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test.describe('Testing login page', () => {
  test.beforeAll(async ( ) => {
    await deleteAllTestUsers();
  });

  test.beforeEach(async ({page}) => {
    login = new loginForm(page);
    await login.goToLoginPage();
    await delay(1000);
  });

  test.afterEach(async () => {
    await login.closePage();
  });


  test('Login with valid credentials', async () => {
    await deleteAllTestUsers();
    await createTestUser();
    await login.login('frontendUnitTest', 'unitTest#0001');
    await deleteTestUser();
  });

  test('Login with username field starts with a number', async () => {
    await login.loginBtnShouldBeDisabled('2validUsername', 'valid1_Password');
  });

  test('Login with username field contains special character', async () => {
    await login.loginBtnShouldBeDisabled('valid%Username', 'valid1_Password');
  });

  test('Login with username field contains whitespace character', async () => {
    await login.loginBtnShouldBeDisabled('valid Username', 'valid1_Password');
  });

  test('Login with username field is too short', async () => {
    await login.loginBtnShouldBeDisabled('val', 'valid1_Password');
  });

  test('Login with username field is too long', async () => {
    await login.loginBtnShouldBeDisabled('validUsernameShouldNotBeThis', 'valid1_Password');
  });

  test('Login with password field does not contain a capital letter', async () => {
    await login.loginBtnShouldBeDisabled('validUsername', 'valid1_password');
  });

  test('Login with password field does not contain a number', async () => {
    await login.loginBtnShouldBeDisabled('validUsername', 'valid_Password');
  });

  test('Login with password field does not contain a special character', async () => {
    await login.loginBtnShouldBeDisabled('validUsername', 'valid1Password');
  });

  test('Login with password field is too short', async () => {
    await login.loginBtnShouldBeDisabled('validUsername', 'val1#Pa');
  });

  test('Login with password field is too long', async () => {
    await login.loginBtnShouldBeDisabled('validUsername', 'This_Password_1s_not_valid');
  });
});

test.describe('Testing register page', () => {
  test.beforeAll(async () => {
    await deleteAllTestUsers();
  });

  test.beforeEach(async ({page}) => {
    register = new registerForm(page);
    await register.goToRegisterPage();
    await delay(1000);
  });

  test.afterEach(async () => {
    await register.closePage();
  });


  test('Register with valid credentials', async () => {
    await deleteAllTestUsers();
    await register.register('frontendUnitTest', 'unitTest#0001');
    await deleteTestUser();
  });

  test('Register with username field starts with a number', async () => {
    await register.registerBtnShouldBeDisabled('2validUsername', 'valid1_Password');
  });

  test('Register with username field contains a special character', async () => {
    await register.registerBtnShouldBeDisabled('valid%Username', 'valid1_Password');
  });

  test('Register with username field contains a whitespace character', async () => {
    await register.registerBtnShouldBeDisabled('valid Username', 'valid1_Password');
  });

  test('Register with username field is too short', async () => {
    await register.registerBtnShouldBeDisabled('val', 'valid1_Password');
  });

  test('Register with username field is too long', async () => {
    await register.registerBtnShouldBeDisabled('validUsernameShouldNotBeThis', 'valid1_Password');
  });

  test('Register with password field does not contain a capital letter', async () => {
    await register.registerBtnShouldBeDisabled('validUsername', 'valid1_password');
  });

  test('Register with password field does not contain a number', async () => {
    await register.registerBtnShouldBeDisabled('validUsername', 'valid_Password');
  });

  test('Register with password field does not contain a special character', async () => {
    await register.registerBtnShouldBeDisabled('validUsername', 'valid1Password');
  });

  test('Register with password field is too short', async () => {
    await register.registerBtnShouldBeDisabled('validUsername', 'val1#Pa');
  });

  test('Register with password field is too long', async () => {
    await register.registerBtnShouldBeDisabled('validUsername', 'This_Password_1s_not_valid');
  });
});
test.describe('Testing home page', () => {
  test.beforeAll(async () => {
    await deleteAllTestUsers();
  });
  test.beforeEach(async ({page}) => {
    home = new homePage(page);
    login = new loginForm(page);
    await home.goToLoginPage();
    await delay(2500);
  });

  test.afterEach(async () => {
    await deleteTestUser();
    await home.closePage();
  });

  test('Home page should be rendered & should be able to logout', async () => {
    await deleteAllTestUsers();
    await createTestUser();
    await login.login('frontendUnitTest', 'unitTest#0001');
    const jwtToken = await home.retrieveJwtToken();
    expect(jwtToken).not.toEqual('');
    await home.logout();
    const emptyJwtToken = await home.retrieveJwtToken();
    expect(emptyJwtToken).toEqual(null);
  });
});
