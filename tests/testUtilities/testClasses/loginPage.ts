import {expect, Locator, Page} from "@playwright/test";

export class loginPage {
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

