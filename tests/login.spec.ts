import { execSync } from 'child_process';
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
    const FORK_URL="https://base-sepolia.g.alchemy.com/v2/r_UhS181wZiHccuPFe7LDmLODkQ9w_1a";
    try {
        execSync(`FORK_URL=${FORK_URL} docker compose up -d`, { stdio: "inherit", });
    } catch (error: any) {
        throw new Error(`Failed to start network: ${error.message}`);
    }
    await new Promise(f => setTimeout(f, 10000));

    try {
        let chainId = execSync("cast chain-id --rpc-url http://0.0.0.0:8545", {
          encoding: "utf-8",
        });
        console.log(`The chain id is: ${chainId}`);
      } catch (error: any) {
        // throw error only if its not about container not running
        if (!error.message.toLowerCase().includes("error sending request")) {
          throw new Error(
            `Unknow error when attempting to retrieve chain id of the running local network\nerror: ${error.message}`
          );
        }
      }

    
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