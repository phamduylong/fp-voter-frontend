import { test, expect } from '@playwright/test';
import { createTestUser, createTestAdmin, deleteTestUser, deleteTestAdmin, deleteAllTestUsers, deleteAllTestAdmins } from './testUtilities/testUtilities';
import { loginPage } from './testUtilities/testClasses/loginPage';
import { registerPage } from './testUtilities/testClasses/registerPage';
import { homePage } from './testUtilities/testClasses/homePage';
import { utilityPages } from './testUtilities/testClasses/utilityPages';
import { footerPages } from './testUtilities/testClasses/footerPages';

let login: loginPage;
let register: registerPage;
let home: homePage;
let utilities: utilityPages;
let footers: footerPages;


const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test.describe('Testing login page', () => {
  test.beforeAll(async ( ) => {
    await deleteAllTestUsers();
  });

  test.beforeEach(async ({page}) => {
    login = new loginPage(page);
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
    await login.loginBtnShouldBeDisabled('2invalidUsername', 'invalid1_Password');
  });

  test('Login with username field contains special character', async () => {
    await login.loginBtnShouldBeDisabled('invalid%Username', 'invalid1_Password');
  });

  test('Login with username field contains whitespace character', async () => {
    await login.loginBtnShouldBeDisabled('invalid Username', 'invalid1_Password');
  });

  test('Login with username field is too short', async () => {
    await login.loginBtnShouldBeDisabled('val', 'invalid1_Password');
  });

  test('Login with username field is too long', async () => {
    await login.loginBtnShouldBeDisabled('validUsernameShouldNotBeThis', 'invalid1_Password');
  });

  test('Login with password field does not contain a capital letter', async () => {
    await login.loginBtnShouldBeDisabled('invalidUsername', 'invalid1_password');
  });

  test('Login with password field does not contain a number', async () => {
    await login.loginBtnShouldBeDisabled('invalidUsername', 'invalid_Password');
  });

  test('Login with password field does not contain a special character', async () => {
    await login.loginBtnShouldBeDisabled('invalidUsername', 'invalid1Password');
  });

  test('Login with password field is too short', async () => {
    await login.loginBtnShouldBeDisabled('invalidUsername', 'val1#Pa');
  });

  test('Login with password field is too long', async () => {
    await login.loginBtnShouldBeDisabled('invalidUsername', 'This_Password_1s_not_valid');
  });
});

test.describe('Testing register page', () => {
  test.beforeAll(async () => {
    await deleteAllTestUsers();
  });

  test.beforeEach(async ({page}) => {
    register = new registerPage(page);
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
    await register.registerBtnShouldBeDisabled('2invalidUsername', 'invalid1_Password');
  });

  test('Register with username field contains a special character', async () => {
    await register.registerBtnShouldBeDisabled('invalid%Username', 'invalid1_Password');
  });

  test('Register with username field contains a whitespace character', async () => {
    await register.registerBtnShouldBeDisabled('invalid Username', 'invalid1_Password');
  });

  test('Register with username field is too short', async () => {
    await register.registerBtnShouldBeDisabled('val', 'invalid1_Password');
  });

  test('Register with username field is too long', async () => {
    await register.registerBtnShouldBeDisabled('validUsernameShouldNotBeThis', 'invalid1_Password');
  });

  test('Register with password field does not contain a capital letter', async () => {
    await register.registerBtnShouldBeDisabled('invalidUsername', 'invalid1_password');
  });

  test('Register with password field does not contain a number', async () => {
    await register.registerBtnShouldBeDisabled('invalidUsername', 'invalid_Password');
  });

  test('Register with password field does not contain a special character', async () => {
    await register.registerBtnShouldBeDisabled('invalidUsername', 'invalid1Password');
  });

  test('Register with password field is too short', async () => {
    await register.registerBtnShouldBeDisabled('invalidUsername', 'val1#Pa');
  });

  test('Register with password field is too long', async () => {
    await register.registerBtnShouldBeDisabled('invalidUsername', 'This_Password_1s_not_valid');
  });
});

test.describe('Testing home page', () => {
  test.beforeAll(async () => {
    await deleteAllTestUsers();
  });
  test.beforeEach(async ({page}) => {
    home = new homePage(page);
    login = new loginPage(page);
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
    await delay(1000);
    await login.login('frontendUnitTest', 'unitTest#0001');
    const jwtToken = await home.retrieveJwtToken();
    expect(jwtToken).not.toEqual(null);
    await home.logout();
    await delay(1000);
    const emptyJwtToken = await home.retrieveJwtToken();
    expect(emptyJwtToken).toEqual(null);
  });
});


test.describe('Testing candidate & result page', () => {
  test.beforeAll(async () => {
    await deleteAllTestUsers();
  });
  test.beforeEach(async ({page}) => {
    utilities = new utilityPages(page)
    login = new loginPage(page);
    await utilities.goToLoginPage();
    await delay(2500);
  });

  test.afterEach(async () => {
    await deleteTestAdmin();
    await utilities.closePage();
  });

  test('Verify admin rights functionality and result page rendering', async () => {
    await createTestAdmin();
    await delay(1000);
    await login.login('frontendAdmin', 'unitTest#0001');
    await utilities.shouldHaveAdminRights();
    await utilities.resultPageShouldBeRendered();
    await utilities.logout();
  });
});

test.describe('Testing footer pages', () => {

  test.beforeAll(async () => {
    await deleteAllTestUsers();
  });


  test('Verify footer pages rendering', async ({page}) => {
    footers = new footerPages(page);
    await footers.goToMainPage();
    await delay(2500);
    await footers.faqPageShouldBeRendered();
    await footers.aboutUsPageShouldBeRendered();
    await footers.privacyPolicyPageShouldBeRendered();
    await footers.termsAndConditionsPageShouldBeRendered();
    await footers.closePage();
  });
});
