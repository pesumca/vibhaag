import { expect, test } from "@playwright/test";

const apiBaseUrl = process.env.API_BASE_URL ?? "http://api.vibhaag.localhost";

const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet", width: 834, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const pages = [
  { name: "dashboard", path: "/", heading: "Attendance, insights, and timetable in one place." },
  { name: "attendance", path: "/attendance", heading: "Today’s sessions" },
  { name: "sessions", path: "/sessions", heading: "Create course" },
  { name: "people", path: "/people", heading: "Departments & batches" },
  { name: "engagement", path: "/engagement", heading: "Broadcast announcements" },
  { name: "analytics", path: "/analytics", heading: "Participation score" },
];

async function login(
  page: import("@playwright/test").Page,
  request: import("@playwright/test").APIRequestContext
) {
  const response = await request.post(`${apiBaseUrl}/auth/login`, {
    data: { email: "admin@vibhaag.dev", password: "admin123" },
  });
  expect(response.ok()).toBeTruthy();
  const data = await response.json();

  await page.addInitScript(
    ({ token }) => {
      localStorage.setItem("vibhaag-token", token);
    },
    { token: data.token }
  );

  await page.goto("/");
  await page.waitForSelector(".app-shell");
}

async function disableAnimations(page: import("@playwright/test").Page) {
  await page.addStyleTag({
    content: "* { animation: none !important; transition: none !important; }",
  });
}

test.describe("visual snapshots", () => {
  for (const pageDef of pages) {
    test(`page: ${pageDef.name}`, async ({ page, request }) => {
      await login(page, request);
      await disableAnimations(page);

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(pageDef.path);
        await page.waitForSelector(".app-shell");
        await expect(page.getByRole("heading", { name: pageDef.heading })).toBeVisible();
        await page.waitForTimeout(200);
        await expect(page).toHaveScreenshot(`${pageDef.name}-${viewport.name}.png`, {
          fullPage: true,
        });
      }
    });
  }
});
