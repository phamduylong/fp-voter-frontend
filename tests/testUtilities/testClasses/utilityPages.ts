import {expect, Page} from "@playwright/test";

export class utilityPages {
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

    async shouldHaveAdminRights(){
        const candidateLink = this.page.locator('a', { hasText: 'Candidates' });
        await candidateLink.click();
        await this.page.waitForURL("http://localhost:8081/candidates",{ timeout: 5000 });
        expect(this.page.url()).toBe("http://localhost:8081/candidates");
        const modifyCandidateBtn = this.page.locator(`#page-content > div > div:nth-last-child(2)> div > button`);
        const deleteCandidateBtn = this.page.locator("#page-content > div > div:nth-child(7) > div > button:nth-child(2)")
        expect (modifyCandidateBtn && deleteCandidateBtn).toBeTruthy();

    }

    async resultPageShouldBeRendered(){
        const resultLink = this.page.locator('a', { hasText: 'Results' });
        await resultLink.click();
        await this.page.waitForURL("http://localhost:8081/results",{ timeout: 5000 });
        expect(this.page.url()).toBe("http://localhost:8081/results");
        const resultWillBePublishedInText = this.page.locator('h2:has-text("Results will be published in ")');
        await expect(resultWillBePublishedInText).toContainText('Results will be published in ');
    }



    async logout(){
        const logoutButton = this.page.locator('button:has-text("Logout")');
        await logoutButton.click();
        await this.page.waitForURL("http://localhost:8081/",{ timeout: 5000 });
        expect(this.page.url()).toBe("http://localhost:8081/");
    }

}


