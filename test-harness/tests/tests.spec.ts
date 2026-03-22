import { test, expect } from "@playwright/test";

[
  { direction: "clockwise", dice: "3,5", doublingCube: { value: 16 } },
  {
    direction: "anticlockwise",
    dice: "2,6",
    doublingCube: { value: 32, owner: "player" },
  },
  { direction: "anticlockwise", dice: "1,3" },
].forEach(({ direction, dice, doublingCube }) => {
  test(`overload - direction: ${direction} - dice: ${dice} - doublingValue: ${doublingCube?.value ?? "N/A"} - doublingOwner: ${doublingCube?.owner ?? "N/A"}`, async ({
    page,
  }) => {
    await page.goto(
      `/tests/index.html?position=overload&direction=${direction}&dice=${dice}&doublingValue=${doublingCube?.value}&doublingOwner=${doublingCube?.owner}`,
    );
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test(`default - direction: ${direction} - dice: ${dice} - doublingValue: ${doublingCube?.value ?? "N/A"} - doublingOwner: ${doublingCube?.owner ?? "N/A"}`, async ({
    page,
  }) => {
    await page.goto(
      `/tests/index.html?position=default&direction=${direction}&dice=${dice}&doublingValue=${doublingCube?.value}&doublingOwner=${doublingCube?.owner}`,
    );
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test(`crazy - direction: ${direction} - dice: ${dice} - doublingValue: ${doublingCube?.value ?? "N/A"} - doublingOwner: ${doublingCube?.owner ?? "N/A"}`, async ({
    page,
  }) => {
    await page.goto(
      `/tests/index.html?position=default&theme=crazy&direction=${direction}&dice=${dice}&doublingValue=${doublingCube?.value}&doublingOwner=${doublingCube?.owner}`,
    );
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });
});
