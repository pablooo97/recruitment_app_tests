import { Page, Locator, expect } from '@playwright/test';

export class StepperPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly addressInput: Locator;
    readonly backStep2Button: Locator;
    readonly backStep3Button: Locator;
    readonly resetButton: Locator;
    readonly nextStep1Button: Locator;
    readonly nextStep2Button: Locator;
    readonly nameIsRequiredError: Locator;
    readonly submittedHeader: Locator; 
    readonly submittedName: Locator;
    readonly submittedAddress: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByRole('textbox', { name: 'Name' });
        this.addressInput = page.getByRole('textbox', { name: 'Address' });
        this.backStep2Button = page.getByRole('button', { name: 'Back' }).nth(0);
        this.backStep3Button = page.getByRole('button', { name: 'Back' }).nth(1);
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.nextStep1Button = page.getByRole('button', { name: 'Next' }).nth(0);
        this.nextStep2Button = page.getByRole('button', { name: 'Next' }).nth(1);
        this.nameIsRequiredError = page.getByText('This field is required.');
        this.submittedHeader = page.locator('p').filter({ hasText: 'You are now done!' });
        this.submittedName = page.locator('p').filter({ hasText: /Name:/ });
        this.submittedAddress = page.locator('p').filter({ hasText: /Address:/ });
    }

    async goToStepperPage() {
        await this.page.goto('https://angular-qa-recruitment-app.netlify.app/stepper');
    }

    async fillForm(name: string, address: string) {
        await this.nameInput.fill(name);
        await this.clickNextButtonOnStep1();
        await this.addressInput.fill(address);
        await this.clickNextButtonOnStep2();
    }

    async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    async fillAddress(address: string) {
        await this.addressInput.fill(address);
    }

    async clearNameInput() {
        await this.nameInput.clear();
    }

    async clearAddressInput() {
        await this.addressInput.clear();
    }

    async verifyErrorVisible() {
        await expect(this.nameIsRequiredError).toBeVisible();
    }

    async verifyNameInputVisible() {
        await expect(this.nameInput).toBeVisible();
    }

    async verifySubmittedData(name: string, address: string) {
        await expect(this.submittedHeader).toBeVisible();
        await expect(this.submittedName).toContainText(`Name: ${name}`);
        await expect(this.submittedAddress).toContainText(`Address: ${address}`);
    }

    async verifyDataAfterClickingBackFromDonePage(name: string, address: string) {
        await expect(this.addressInput).toHaveValue(address);
        await this.clickBackOnStep2();
        await expect(this.nameInput).toHaveValue(name);

    }

    async verifyFieldsAfterClickingReset() {
        await expect(this.nameInput).toBeEmpty();
        await expect(this.nameInput).toBeVisible();
        await expect(this.addressInput).not.toBeVisible();
        await expect(this.backStep3Button).not.toBeVisible();
    }

    async clickBackOnStep2() {
        await this.backStep2Button.click();
    }

    async clickBackOnStep3() {
        await this.backStep3Button.click();
    }

    async clickNextButtonOnStep1() {
        await this.nextStep1Button.click();
    }

    async clickNextButtonOnStep2() {
        await this.nextStep2Button.click();
    }   
}


