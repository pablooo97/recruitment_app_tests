import { Page, Locator, expect } from '@playwright/test';

export class WelcomePage {
    readonly page: Page;
    readonly welcomeNav: Locator;
    readonly formNav: Locator;
    readonly stepperNav: Locator;
    readonly twitterNav: Locator;
    readonly youtubeNav: Locator;
    readonly learnAngularButton: Locator;
    readonly CLIDocumentationButton: Locator;
    readonly AngularBlogButton: Locator;
    readonly AngularDevToolsButton: Locator;
    readonly newComponentButton: Locator;
    readonly angularMaterialButton: Locator;
    readonly addPWASupportButton: Locator;
    readonly addDependency: Locator;
    readonly runAndWatchTestsButton: Locator;
    readonly buildForProductionButton: Locator;
    readonly terminalOutput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeNav = page.locator('.toolbar').getByRole('link', { name: 'Welcome' });
        this.formNav = page.locator('.toolbar').getByRole('link', { name: 'Form' });
        this.stepperNav = page.locator('.toolbar').getByRole('link', { name: 'Stepper' });
        this.twitterNav = page.locator('.toolbar').getByRole('link', { name: 'Twitter' });
        this.youtubeNav = page.locator('.toolbar').getByRole('link', { name: 'YouTube' });
        this.learnAngularButton = page.getByRole('link', { name: 'Learn Angular' });
        this.CLIDocumentationButton = page.getByRole('link', { name: 'CLI Documentation' });
        this.AngularBlogButton = page.getByRole('link', { name: 'Angular Blog' });
        this.AngularDevToolsButton = page.getByRole('link', { name: 'Angular DevTools' });
        this.newComponentButton = page.getByRole('button', { name: 'New Component' });
        this.angularMaterialButton = page.getByRole('button', { name: 'Angular Material' });
        this.addPWASupportButton = page.getByRole('button', { name: 'Add PWA Support' });
        this.addDependency = page.getByRole('button', { name: 'Add Dependency' });
        this.runAndWatchTestsButton = page.getByRole('button', { name: 'Run and Watch Tests' });
        this.buildForProductionButton = page.getByRole('button', { name: 'Build for Production' });
        this.terminalOutput = page.locator('.terminal pre');
    }


    async goToWelcomePage() {
        await this.page.goto('https://angular-qa-recruitment-app.netlify.app/');
    }

    async clickWelcomeNav() {
        await this.welcomeNav.click();
    }

    async verifyWelcomePageRedirected() {
        await expect(this.page).toHaveURL('https://angular-qa-recruitment-app.netlify.app/');
    }

    async clickFormNav() {
        await this.formNav.click();
    }

    async verifyFormPageRedirected() {
        await expect(this.page).toHaveURL('https://angular-qa-recruitment-app.netlify.app/form');
    }

        async clickStepperNav() {
        await this.stepperNav.click();
    }

    async verifyStepperPageRedirected() {
        await expect(this.page).toHaveURL('https://angular-qa-recruitment-app.netlify.app/stepper');
    }

        async clickTwitterNav() {
        await this.twitterNav.click();
    }

    async verifyTwitterRedirected(tab: Page) {
        await expect(tab).toHaveURL('https://x.com/angular');
    }

        async clickYoutubeNav() {
        await this.youtubeNav.click();
    }

    async verifyYouTubeRedirected(tab: Page) {
        await expect(tab).toHaveURL(/(?=.*youtube\.com)(?=.*angular)/i);
    }

    async clickAndGetNewTab(targetLocator: Locator): Promise<Page> {
        const pagePromise = this.page.context().waitForEvent('page');
        await targetLocator.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        return newPage;
    }

    async closeNewTab(tab: Page) {
        await tab.close();
    }

    async verifyLearnAngularRedirected(tab: Page) {
        await expect(tab).toHaveURL('https://v17.angular.io/docs');
    }

    async verifyCLIDocumentationRedirected(tab: Page) {
        await expect(tab).toHaveURL('https://v17.angular.io/cli');
    }

    async verifyAngularBlogRedirected(tab: Page) {
        await expect(tab).toHaveURL('https://blog.angular.dev/');
    }

    async verifyAngularDevToolsRedirected(tab: Page) {
        await expect(tab).toHaveURL('https://v17.angular.io/guide/devtools');
    }

    async clickNewComponent() {
        await this.newComponentButton.click();
    }

    async verifyNewComponentTerminalCommand() {
        await expect(this.terminalOutput).toContainText('ng generate component xyz');
    }

    async clickAngularMaterial() {
        await this.angularMaterialButton.click();
    }

    async verifyAngularMaterialTerminalCommand() {
        await expect(this.terminalOutput).toContainText('ng add @angular/material');
    }

    async clickAddPWASupport() {
        await this.addPWASupportButton.click();
    }

    async verifyAddPWASupportTerminalCommand() {
        await expect(this.terminalOutput).toContainText('ng add @angular/pwa');
    }

    async clickAddDependency() {
        await this.addDependency.click();
    }

    async verifyAddDependencyTerminalCommand() {
        await expect(this.terminalOutput).toContainText('ng add _____');
    }

    async clickRunAndWatchTests() {
        await this.runAndWatchTestsButton.click();
    }

    async verifyRunAndWatchTestsTerminalCommand() {
        await expect(this.terminalOutput).toContainText('ng test');
    }

    async clickBuildForProduction() {
        await this.buildForProductionButton.click();
    }

    async verifyBuildForProductionTerminalCommand() {
        await expect(this.terminalOutput).toContainText('ng build');
    }

        async verifyDefaultTerminalCommand() {
        await expect(this.terminalOutput).toContainText('ng generate component xyz');
    }

}


