import {expect, Page} from "@playwright/test";

export class homePage {
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
            return sessionStorage.getItem('jwt');
        });
    }

    async logout(){
        const logoutButton = this.page.locator('button:has-text("Logout")');
        await logoutButton.click();
        await this.page.waitForURL("http://localhost:8081/home",{ timeout: 5000 });
        expect(this.page.url()).toBe("http://localhost:8081/home");
    }

}