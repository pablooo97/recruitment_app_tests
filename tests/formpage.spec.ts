import { test } from '@playwright/test';
import { FormPage } from './pages/formPage';
import { faker } from '@faker-js/faker';

let formPage: FormPage;

const name = faker.person.fullName();
const alterEgo = faker.internet.username();
const heroPower = 'Really Smart';

const editedHeroName = faker.person.fullName();
const editedAlterEgo = faker.internet.username();
const editedHeroPower = 'Weather Changer';

test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);
    await formPage.goToFormPage();
});

test.describe('Form submission tests', () => {

    test('Submitting valid form displays submitted data', async () => {
        await formPage.fillAndSubmitForm(name, alterEgo, heroPower);
        await formPage.verifySubmittedData(name, alterEgo, heroPower);
    });

});

test.describe('Edit functionality tests', () => {

    test('Clicking Edit button after submit returns to the form', async () => {
        await formPage.fillForm(name, alterEgo, heroPower);
        await formPage.submitForm();
        await formPage.clickEdit();
        await formPage.verifyFormVisibleAfterEdit();
    });

    test('Submitting edited form displays updated data', async () => {
        await formPage.fillForm(name, alterEgo, heroPower);
        await formPage.submitForm();
        await formPage.clickEdit();
        await formPage.fillForm(editedHeroName, editedAlterEgo, editedHeroPower);
        await formPage.submitForm();
        await formPage.verifySubmittedData(editedHeroName, editedAlterEgo, editedHeroPower);
    });

    test('Clicking Edit button after submit returns correct values to the form', async () => {
        await formPage.fillForm(name, alterEgo, heroPower);
        await formPage.submitForm();
        await formPage.clickEdit();
        await formPage.verifyDataAfterEdit(name, alterEgo, heroPower);
    });

});

test.describe('Form validation tests', () => {

    test('Submit button is disabled when form is empty', async () => {
        await formPage.clearNameInput();
        await formPage.verifySubmitButtonDisabled();
    });

    test('Error is visible when name field is empty', async () => {
        await formPage.clearNameInput()
        await formPage.verifyErrorVisible();
    });

    test('Submit button is enabled when form is filled correctly', async () => {
        await formPage.fillForm(name, alterEgo, heroPower);
        await formPage.verifySubmitButtonEnabled();
    });

    test('Clicking New Hero resets the form', async () => {
        await formPage.fillForm(name, alterEgo, heroPower);
        await formPage.clickNewHero();
        await formPage.verifyDataAfterClickingNewHero();
    });

});