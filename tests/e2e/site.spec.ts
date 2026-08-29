import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("the main public journeys render without serious accessibility issues", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of [
    "/",
    "/founders",
    "/prize",
    "/vendor",
    "/accreditation",
  ]) {
    await page.goto(path);
    await expect(page.locator("main")).toBeVisible();
    const results = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
});

test("the prize form reports missing required details", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/prize");
  await expect(page.locator("form")).toHaveAttribute("data-hydrated", "true");
  await page.getByRole("button", { name: "Submit application" }).click();
  await expect(page.getByRole("alert").first()).toBeVisible();
});
