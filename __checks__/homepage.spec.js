const { expect, test } = require('@playwright/test')

test('Check if login page diplay well', async ({ page }) => {
  const response = await page.goto("https://peepsdb.vzxy.net/login")

  expect(response?.status()).toBeLessThan(400)
  await expect(page).toHaveTitle(/PeepsDB/)
  await page.screenshot({ path: 'homepage.jpg' })
})
