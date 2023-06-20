const { chromium } = require("playwright")
const { test, expect } = require("@playwright/test")

test("Make sure login with google account is working well", async ({page}) => {

  // Load "https://peepsdb.vzxy.net/login"
  await page.goto("https://peepsdb.vzxy.net/login")

  // Click on <a> [href="https://vzxya.net/auth/google"]
  await page.click('[href="https://vzxya.net/auth/google"]')

  // Fill "name@..."" on <input> email
  await page.locator('input[type="email"]').type("sjultra.peepsdb@gmail.com")
  await page.click("#identifierNext")

  // Fill "password" on <input> password
  await page.locator('input[type="password"]').waitFor()
  await page.locator('input[type="password"]').type("SJULTRA_-_2022")
  await page.click("#passwordNext")

  // Click on <button> "Proceed"
  await page.locator(".css-icp688").waitFor()
  const res = await page.click(".css-icp688")

  expect(res.status()).toBeLessThan(400)
  await expect(page).toHaveTitle(/PeepsDB/)

  await page.screenshot({ path: "homepage.jpg" })

  await page.close();

})
  