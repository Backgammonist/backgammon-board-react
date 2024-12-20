import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Die } from "./Die";

test("renders name", async () => {
  const { getByText, getByRole } = render(<Die value={6} />);

  console.log("getByText", getByText);

  await expect.element(getByTag("Hello Vitest x1!")).toBeInTheDocument();
  await getByRole("button", { name: "Increment " }).click();

  await expect.element(getByText("Hello Vitest x2!")).toBeInTheDocument();
});
