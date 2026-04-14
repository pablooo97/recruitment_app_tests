import { test } from '@playwright/test';
import { WelcomePage } from './pages/welcomePage';

    let welcomePage: WelcomePage;

test.beforeEach(async ({ page }) => {
    welcomePage = new WelcomePage(page);
    await welcomePage.goToWelcomePage();
});

test.describe('Navigation bar redirect tests', () => {  

    test('Clicking on Welcome navigation link redirects to the correct page', async () => {
        await welcomePage.clickWelcomeNav();
        await welcomePage.verifyWelcomePageRedirected();
    });

    test('Clicking on Form navigation link redirects to the correct page', async () => {
        await welcomePage.clickFormNav();
        await welcomePage.verifyFormPageRedirected();
    });

    test('Clicking on Stepper navigation link redirects to the correct page', async () => {
        
        await welcomePage.clickStepperNav();
        await welcomePage.verifyStepperPageRedirected();
    });

    test('Clicking on Twitter navigation link redirects to the correct page', async () => {
        const newTab = await welcomePage.clickAndGetNewTab(welcomePage.twitterNav);
        await welcomePage.verifyTwitterRedirected(newTab);
    });

    test('Clicking on Youtube navigation link redirects to the correct page', async () => {
        const newTab = await welcomePage.clickAndGetNewTab(welcomePage.youtubeNav);
        await welcomePage.verifyYouTubeRedirected(newTab);
    });
});

test.describe('Resources redirect tests', () => {    

    test('Clicking on Learn Angular button redirects to the correct page', async () => {
        const newTab = await welcomePage.clickAndGetNewTab(welcomePage.learnAngularButton);
        await welcomePage.verifyLearnAngularRedirected(newTab);
    });

    test('Clicking on CLI Documentation button redirects to the correct page', async () => {
        const newTab = await welcomePage.clickAndGetNewTab(welcomePage.CLIDocumentationButton);
        await welcomePage.verifyCLIDocumentationRedirected(newTab);
    });

        test('Clicking on Angular Blog button redirects to the correct page', async () => {
        const newTab = await welcomePage.clickAndGetNewTab(welcomePage.AngularBlogButton);
        await welcomePage.verifyAngularBlogRedirected(newTab);
    });

        test('Clicking on Angular DevTools button redirects to the correct page', async () => {
        const newTab = await welcomePage.clickAndGetNewTab(welcomePage.AngularDevToolsButton);
        await welcomePage.verifyAngularDevToolsRedirected(newTab);
    });

});

test.describe('Terminal command tests', () => {    

    test('Checking default terminal command', async () => {
        await welcomePage.verifyDefaultTerminalCommand();
    });

    test('Clicking on New Component button changes the terminal command', async () => {
        await welcomePage.clickNewComponent();
        await welcomePage.verifyNewComponentTerminalCommand();
    });

    test('Clicking on Angular Material button changes the terminal command', async () => {
        await welcomePage.clickAngularMaterial();
        await welcomePage.verifyAngularMaterialTerminalCommand();
    });

    test('Clicking on Add PWA Support button changes the terminal command', async () => {
        await welcomePage.clickAddPWASupport();
        await welcomePage.verifyAddPWASupportTerminalCommand();
    });

    test('Clicking on Add Dependency button changes the terminal command', async () => {
        await welcomePage.clickAddDependency();
        await welcomePage.verifyAddDependencyTerminalCommand();     
    });

    test('Clicking on Run and Watch Tests button changes the terminal command', async () => {
        await welcomePage.clickRunAndWatchTests();
        await welcomePage.verifyRunAndWatchTestsTerminalCommand();
    });

    test('Clicking on Build for Production button changes the terminal command', async () => {
        await welcomePage.clickBuildForProduction();
        await welcomePage.verifyBuildForProductionTerminalCommand();
    });
});