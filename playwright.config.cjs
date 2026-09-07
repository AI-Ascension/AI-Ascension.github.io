const { defineConfig } = require("@playwright/test");

const launchOptions = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
  : {};

module.exports = defineConfig({
  testDir: "tests/browser",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:4173",
    launchOptions,
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node tests/serve.cjs .pages-dist",
    url: "http://127.0.0.1:4173/index.html",
    reuseExistingServer: false,
    timeout: 30000,
  },
});
