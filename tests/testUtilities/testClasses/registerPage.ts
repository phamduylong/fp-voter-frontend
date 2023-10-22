import {expect, Locator, Page} from "@playwright/test";

export class registerPage {
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

