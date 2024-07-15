import { Page } from "@playwright/test"
import { HomePage } from "./homePage";

export class ContactPage {
    page: Page;

    constructor (page: Page) {
        this.page = page;
    }

    async GoTo() {
        const homePage = new HomePage(this.page)
        await homePage.GoTo()
        await this.page.getByRole('link', { name: 'Contact' }).click();
        await this.page.waitForURL('./contact/');
    }
}