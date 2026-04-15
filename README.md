# Recruitment App Tests

Automated end-to-end tests for the [Angular QA Recruitment App](https://angular-qa-recruitment-app.netlify.app) built with [Playwright](https://playwright.dev) and TypeScript.

## Requirements

- Node.js `22.12.0`
- npm `10.9.0`

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# All tests
npm run "test all"

# Only Welcome Page tests
npm run "test welcomePage"

# Only Form Page tests
npm run "test formPage"

# Only Stepper Page tests
npm run "test stepperPage"
```

## Project Structure

```
tests/
  pages/              # Page Object Model classes
    welcomePage.ts
    formPage.ts
    stepperPage.ts
  welcomepage.spec.ts
  formpage.spec.ts
  stepperpage.spec.ts
playwright.config.ts
```

## Configuration

Tests run in parallel on one browser: **Chromium**.
