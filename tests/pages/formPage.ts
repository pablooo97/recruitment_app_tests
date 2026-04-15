import { Page, Locator, expect } from '@playwright/test';

export class FormPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly alterEgoInput: Locator;
    readonly heroPowerSelect: Locator;
    readonly submitButton: Locator;
    readonly newHeroButton: Locator;
    readonly editButton: Locator;
    readonly nameIsRequiredError: Locator;
    readonly submittedName: Locator;
    readonly submittedAlterEgo: Locator;
    readonly submittedHeroPower: Locator;  
    readonly submittedHeader: Locator;  

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByRole('textbox', { name: 'Name' });
        this.alterEgoInput = page.getByRole('textbox', { name: 'Alter Ego' });
        this.heroPowerSelect = page.getByLabel('Hero Power');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.newHeroButton = page.getByRole('button', { name: 'New Hero' });
        this.editButton = page.getByRole('button', { name: 'Edit' });
        this.nameIsRequiredError = page.getByText('Name is required');
        this.submittedName = page.locator('.row').filter({ hasText: 'Name' }).locator('.col-xs-9');
        this.submittedAlterEgo = page.locator('.row').filter({ hasText: 'Alter Ego' }).locator('.col-xs-9');
        this.submittedHeroPower = page.locator('.row').filter({ hasText: 'Power' }).locator('.col-xs-9');
        this.submittedHeader = page.locator('h2');
    }

    async goToFormPage() {
        await this.page.goto('https://angular-qa-recruitment-app.netlify.app/form');
    }

    async fillForm(name: string, alterEgo: string, heroPower: string) {
        await this.nameInput.fill(name);
        await this.alterEgoInput.fill(alterEgo);
        await this.heroPowerSelect.selectOption({ label: heroPower });
    }

    async clearNameInput() {
        await this.nameInput.clear();
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async clickNewHero() {
        await this.newHeroButton.click();
    }

    async verifyErrorVisible() {
        await expect(this.nameIsRequiredError).toBeVisible();
    }

    async verifySubmitButtonEnabled() {
        await expect(this.submitButton).toBeEnabled();
    }

    async fillAndSubmitForm(name: string, alterEgo: string, heroPower: string) {
    await this.fillForm(name, alterEgo, heroPower);
    await this.submitForm();
    }

    async verifySubmittedData(name: string, alterEgo: string, heroPower: string) {
        await expect(this.submittedHeader).toContainText('You submitted the following:');
        await expect(this.submittedName).toContainText(name);
        await expect(this.submittedAlterEgo).toContainText(alterEgo);
        await expect(this.submittedHeroPower).toContainText(heroPower);
    }

    async verifyDataAfterEdit(name: string, alterEgo: string, heroPower: string) {
        await expect(this.nameInput).toHaveValue(name);
        await expect(this.alterEgoInput).toHaveValue(alterEgo);
        await expect(this.heroPowerSelect).toHaveValue(heroPower);
    }

    async verifyDataAfterClickingNewHero() {
        await expect(this.nameInput).toBeEmpty();
        await expect(this.alterEgoInput).toBeEmpty();
        await expect(this.heroPowerSelect).toHaveValue('');
    }

    async verifySubmitButtonDisabled() {
        await expect(this.submitButton).toBeDisabled();
    }

    async clickEdit() {
        await this.editButton.click();
    }

    async verifyFormVisibleAfterEdit() {
        await expect(this.nameInput).toBeVisible();
        await expect(this.alterEgoInput).toBeVisible();
        await expect(this.heroPowerSelect).toBeVisible();
        await expect(this.submitButton).toBeVisible();
        await expect(this.newHeroButton).toBeVisible();
    }






}
