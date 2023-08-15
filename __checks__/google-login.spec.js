/* eslint-disable testing-library/prefer-screen-queries */
const { test, expect } = require("@playwright/test")

const myUserAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36 Checkly/${process.env.MY_ID}`

test.use({ userAgent: myUserAgent })

test("Make sure login with google account is working well", async ({
  page,
}) => {
  await page.goto(`${process.env.WEBSITE_URL}`)
  await page.locator("a").first().click()

  await page
    .getByRole("textbox", { name: "Email or phone" })
    .fill(`${process.env.GOOGLE_USER_EMAIL}`)
  await page.getByRole("button", { name: /Next/ }).click()

  await page
    .getByRole("textbox", { name: "Enter your password" })
    .fill(`${process.env.GOOGLE_PWD}`)

  await page.locator('div').filter({ hasText: /^Next$/ }).first().click();

  await expect(page).toHaveTitle(/Dashboard/)

  await page.screenshot({ path: "dashboard.jpg" })

  await page.close()
})
