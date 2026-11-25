import { test, expect, type Page } from '@playwright/test';

async function signIn(page: Page, username = 'standard_user') {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
}

test('a locked-out shopper sees an error', async ({ page }) => {
    await signIn(page, 'locked_out_user');
    await expect(page.locator('[data-test="error"]')).toContainText(
        'Sorry, this user has been locked out',
    );
});

test('a shopper can add a backpack to the cart', async ({ page }) => {
    await signIn(page);
    await page.getByRole('button', { name: 'Add to cart' }).first().waitFor();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
});

test('a shopper can complete checkout', async ({ page }) => {
    await signIn(page);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.getByRole('button', { name: 'Checkout', exact: true }).click();
    await page.getByPlaceholder('First Name').fill('Demo');
    await page.getByPlaceholder('Last Name').fill('Shopper');
    await page.getByPlaceholder('Zip/Postal Code').fill('02100');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByRole('button', { name: 'Finish', exact: true }).click();
    await expect(
        page.getByRole('heading', { name: 'Thank you for your order!' }),
    ).toBeVisible();
});