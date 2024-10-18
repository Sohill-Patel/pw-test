import { test, expect } from '../fixture/testFixture';
import { ContactPage } from '../pages/contactPage';

test('test login success', async ({loginPage, page }) => {
    // TODO: use dotEnv on login details
    await loginPage.LogIn("student", "Password123")
    await expect(page.getByText('Logged In Successfully Congratulations student. You successfully logged in! Log')).toBeVisible(); 
});

test('test contact - submit form no data', {
    annotation: {
        type: "AcceptanceCriteria",
        description: "AC-55"
    }
    }, 
    async ({page }) => {
    
    const contact = new ContactPage(page) 
    await contact.GoTo()
    await page.getByRole('button', { name: 'Submit' }).click();
    await new Promise(f => setTimeout(f, 100000));
    await expect(page.getByText('FirstThis field is required.')).toBeVisible();
    await expect(page.locator('id=wpforms-161-field_0')).toBeVisible();

    await expect(page.getByText('LastThis field is required.')).toBeVisible();
    await expect(page.locator('id=wpforms-161-field_0-last')).toBeVisible();

    await expect(page.getByText('Email *This field is required.')).toBeVisible();
    await expect(page.locator('id=wpforms-161-field_1')).toBeVisible();

    await page.getByText('Comment or Message *This field is required').click();
    await expect(page.locator('id=wpforms-161-field_2')).toBeVisible();

});