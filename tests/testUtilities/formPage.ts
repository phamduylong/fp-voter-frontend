import {expect, Locator, Page} from "@playwright/test";


class loginForm {
    private page: Page;
    private usernameField: Locator;
    private passwordField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('input[title="Input username"]');
        this.passwordField = page.locator('input[title="Input password"]');
    }

    async goToLoginPage() {
        await this.page.goto("http://localhost:8081/login");
    }
    async closePage(){
        await this.page.close();
    }

    async login(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        const loginButton = this.page.locator('button:has-text("Login")');
        await expect(loginButton).toBeEnabled();
        await loginButton.click();
        await this.page.waitForURL("http://localhost:8081/home",{ timeout: 10000 });
        expect(this.page.url()).toBe("http://localhost:8081/home");
    }

    async loginBtnShouldBeDisabled(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        const loginButton = this.page.locator('button:has-text("Login")');
        await expect(loginButton).toBeDisabled();
    }
}

class registerForm {
    private page: Page;
    private usernameField: Locator;
    private passwordField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('input[title="Input username"]');
        this.passwordField = page.locator('input[title="Input password"]');
    }

    async goToRegisterPage() {
        await this.page.goto("http://localhost:8081/register");
    }
    async closePage(){
        await this.page.close();
    }

    async register(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        const registerButton = this.page.locator('button:has-text("Register")');
        await registerButton.click();
        await this.page.waitForURL("http://localhost:8081/login",{ timeout: 5000 });
        expect(this.page.url()).toBe("http://localhost:8081/login");
    }
    async registerBtnShouldBeDisabled(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        const registerButton = this.page.locator('button:has-text("Register")');
        await expect(registerButton).toBeDisabled();
    }
}

class homePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToLoginPage() {
        await this.page.goto('http://localhost:8081/login');
    }
    async closePage(){
        await this.page.close();
    }

    async retrieveJwtToken() {
        return await this.page.evaluate(() => {
            return localStorage.getItem('jwt');
        });
    }

    async logout(){
        const greetingButton = this.page.locator('button:has-text("Hello, frontendUnitTest")');
        await greetingButton.click();
        const logoutLink = this.page.locator('a', { hasText: 'Logout' });
        await logoutLink.click();
        await this.page.waitForURL("http://localhost:8081/login",{ timeout: 5000 });
        expect(this.page.url()).toBe("http://localhost:8081/login");
    }

}


export { loginForm, registerForm, homePage };