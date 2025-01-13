import { test, expect } from "@playwright/test";

test("overload", async ({ page }) => {
  await page.goto("/tests/index.html?position=overload");
  await expect(page).toHaveScreenshot();
});

test("default", async ({ page }) => {
  await page.goto("/tests/index.html?position=default");
  await expect(page).toHaveScreenshot();
});

test("crazy", async ({ page }) => {
  await page.goto("/tests/index.html?position=default&theme=crazy");
  await expect(page).toHaveScreenshot();
});
