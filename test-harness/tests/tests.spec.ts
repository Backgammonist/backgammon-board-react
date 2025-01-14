import { test, expect } from "@playwright/test";

test("overload", async ({ page }) => {
  await page.goto("/tests/index.html?position=overload");
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
});

test("default", async ({ page }) => {
  await page.goto("/tests/index.html?position=default");
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
});

test("crazy", async ({ page }) => {
  await page.goto("/tests/index.html?position=default&theme=crazy");
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
});
