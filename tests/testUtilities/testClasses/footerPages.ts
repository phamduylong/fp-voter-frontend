import {expect, Page} from "@playwright/test";

export class footerPages {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToMainPage() {
        await this.page.goto('http://localhost:8081/');
    }
    async closePage(){
        await this.page.close();
    }

    async faqPageShouldBeRendered(){
        const faqLink = this.page.locator('a', { hasText: 'FAQ' });
        await faqLink.click();
        await this.page.waitForURL("http://localhost:8081/faq",{ timeout: 5000 });
        expect(this.page.url()).toBe("http://localhost:8081/faq");
        const faqPageHeader = this.page.locator('h3:has-text("Frequently Asked Questions")');
        await expect(faqPageHeader).toContainText('Frequently Asked Questions');
    }

    async aboutUsPageShouldBeRendered(){
        const aboutUsLink = this.page.locator('a', { hasText: 'About Us' });
        await aboutUsLink.click();
        await this.page.waitForURL("http://localhost:8081/about",{ timeout: 5000 });
        expect(this.page.url()).toBe("http://localhost:8081/about");

        const personCards = await this.page.locator('div.grid > div.card').all();
        const devList = ['phamduylong', 'kendrick-807', 'jaakkoiot', 'Niklasnl'];

        for (const [index, personCard] of personCards.entries()) {
            const devInformation = await personCard.innerText();
            // Check if the header text in the current card contains the dev name
            const devName = devList[index];
            expect(devInformation).toContain(devName);
        }
    }

    async privacyPolicyPageShouldBeRendered(){
        const privacyPolicyLink = this.page.locator('a', { hasText: 'Privacy Policy' });
        await privacyPolicyLink.click();
        await this.page.waitForURL("http://localhost:8081/privacy-policy",{ timeout: 5000 });
        expect(this.page.url()).toBe("http://localhost:8081/privacy-policy");
        const privacyPolicyPageHeader = this.page.locator('h3:has-text("Privacy Policy")');
        await expect(privacyPolicyPageHeader).toContainText('Privacy Policy');
    }

    async termsAndConditionsPageShouldBeRendered(){
        const termsAndConditionsLink = this.page.locator('a', { hasText: 'Terms And Conditions' });
        await termsAndConditionsLink.click();
        await this.page.waitForURL("http://localhost:8081/terms-conditions",{ timeout: 5000 });
        expect(this.page.url()).toBe("http://localhost:8081/terms-conditions");
        const termsAndConditionsPageHeader = this.page.locator('h3:has-text("Terms And Conditions")');
        await expect(termsAndConditionsPageHeader).toContainText('Terms And Conditions');
    }
}