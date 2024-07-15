import { Page } from "@playwright/test"
import { HomePage } from "./homePage";

export class LoginPage {
    page: Page;

    constructor (page: Page) {
        this.page = page;
    }

    async GoTo() {
        const homePage = new HomePage(this.page)
        await homePage.GoTo()

        await this.page.getByRole('link', { name: 'Practice', exact: true }).click();
        await this.page.waitForURL('./practice/');    

        await this.page.getByRole('link', { name: 'Test Login Page' }).click();
        await this.page.waitForURL('./practice-test-login/');    
    }

    async LogIn(username:string, password:string){
        await this.page.getByLabel('Username').fill(username);
        await this.page.getByLabel('Password').fill(password);
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await this.page.waitForURL('./logged-in-successfully/');        
    }
}