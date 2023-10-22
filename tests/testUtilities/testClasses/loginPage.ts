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
        await expect(this.page.url()).toBe("http://localhost:8081/home");
    }

    async loginBtnShouldBeDisabled(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        const loginButton = this.page.locator('button:has-text("Login")');
        await expect (checkUserValidations(username,password)).toBe(false);
        await expect(loginButton).toBeDisabled();
    }
}


function checkUserValidations(username: string, password: string): boolean{
    const usernameRegex = new RegExp(/^(?![\d_])(?!.*[^\w-]).{4,20}$/);
    const isUsernameMatch = usernameRegex.test(username);
    const passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*_])([A-Za-z\d@#$%^&+=!*_]){8,20}$/);
    const isPwdMatch = passwordRegex.test(password);
    return (isUsernameMatch && isPwdMatch);

}