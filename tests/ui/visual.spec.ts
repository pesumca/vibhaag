import { expect, test } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet", width: 834, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const pages = [
  { name: "dashboard", path: "/" },
  { name: "attendance", path: "/attendance" },
  { name: "sessions", path: "/sessions" },
  { name: "people", path: "/people" },
  { name: "engagement", path: "/engagement" },
  { name: "analytics", path: "/analytics" },
];

async function login(page: import("@playwright/test").Page) {
  await page.goto("/");

  if (await page.getByRole("button", { name: "Sign in" }).isVisible()) {
    await page.getByLabel("Email").fill("admin@vibhaag.dev");
    await page.getByLabel("Password").fill("admin123");
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.waitForSelector(".sidebar");
  }
}

async function disableAnimations(page: import("@playwright/test").Page) {
  await page.addStyleTag({
    content: "* { animation: none !important; transition: none !important; }",
  });
}

test.describe("visual snapshots", () => {
  for (const pageDef of pages) {
    test(`page: ${pageDef.name}`, async ({ page }) => {
      await login(page);
      await disableAnimations(page);

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(pageDef.path);
        await page.waitForTimeout(200);
        await expect(page).toHaveScreenshot(`${pageDef.name}-${viewport.name}.png`, {
          fullPage: true,
        });
      }
    });
  }
});
