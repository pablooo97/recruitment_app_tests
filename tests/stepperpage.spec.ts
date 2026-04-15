import { test } from '@playwright/test';
import { StepperPage } from './pages/stepperPage';
import { faker } from '@faker-js/faker';

let stepperPage: StepperPage;
const name = faker.person.fullName();
const address = faker.location.streetAddress();

test.beforeEach(async ({ page }) => {
    stepperPage = new StepperPage(page);
    await stepperPage.goToStepperPage();
});

test.describe('Happy path', () => {

    test('Completing all steps displays submitted data', async () => {
        await stepperPage.fillForm(name, address);
        await stepperPage.verifySubmittedData(name, address);
    });

});

test.describe('Navigation', () => {

    test('Back button on step 2 returns to step 1', async () => {
        await stepperPage.fillName(name);
        await stepperPage.clickNextButtonOnStep1();
        await stepperPage.clickBackOnStep2();
        await stepperPage.verifyNameInputVisible();
    });

    test('Back button on Done page returns to step 2', async () => {
        await stepperPage.fillForm(name, address);
        await stepperPage.clickBackOnStep3();
        await stepperPage.verifyDataAfterClickingBackFromDonePage(name, address);
    });

    test('Reset button on Done page resets the form to step 1', async () => {
        await stepperPage.fillForm(name, address);
        await stepperPage.resetButton.click();
        await stepperPage.verifyFieldsAfterClickingReset();
    });

});

test.describe('Validation', () => {

    test('Error is shown when clicking Next without filling name', async () => {
        await stepperPage.fillName(name);
        await stepperPage.clearNameInput();
        await stepperPage.clickNextButtonOnStep1();
        await stepperPage.verifyErrorVisible();
    });

    test('Error is shown when clicking Next without filling address', async () => {
        await stepperPage.fillName(name);
        await stepperPage.clickNextButtonOnStep1();
        await stepperPage.fillAddress(address);
        await stepperPage.clearAddressInput();
        await stepperPage.verifyErrorVisible();
    });

});