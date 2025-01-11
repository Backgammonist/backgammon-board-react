import { test, expect } from "@playwright/test";

test("overload", async ({ page }) => {
  await page.goto("/tests/index.html?preset=overload");
  await expect(page).toHaveScreenshot();
});

test("default", async ({ page }) => {
  await page.goto("/tests/index.html?preset=default");
  await expect(page).toHaveScreenshot();
});
