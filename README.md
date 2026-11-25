# Playwright Shop Tests

A simple project that uses Playwright and TypeScript to test [Sauce Demo](https://www.saucedemo.com/), a public practice web shop. The suite runs in Chromium locally and in GitHub Actions. It uses public demo credentials and makes no real purchases.

## What's tested

| Scenario | Expected result |
| --- | --- |
| Locked-out user tries to sign in | The shop displays a lockout error. |
| Shopper adds a backpack to the cart | The backpack appears in the cart. |
| Shopper completes checkout | The shop displays an order confirmation. |

The suite covers both a rejected login and a successful shopping journey. Each test uses a fresh browser context so it doesn't depend on the previous test's login or cart.

## Run locally

With Node.js 24 installed, clone this repo and run these commands from the project folder:

```sh
npm ci
npx playwright install chromium
npx playwright test --workers=1 --reporter=list,html
```

To open the HTML report, run `npx playwright show-report`. If PowerShell blocks `npm` or `npx`, use `npm.cmd` or `npx.cmd` instead.

## GitHub Actions

The [CI workflow](.github/workflows/playwright.yml) runs on pushes and pull requests. To see the results, open the [Actions tab](https://github.com/hereispravin/playwright-shop-tests/actions), select a run, and download `playwright-report` under **Artifacts**. Extract the ZIP and open `index.html`.

