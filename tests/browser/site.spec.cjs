const { test, expect } = require("@playwright/test");

test.describe("published static site", () => {
  test("keyboard focus and proof replay work in a real browser", async ({
    page,
  }) => {
    const requests = [];
    page.on("request", (request) => requests.push(request.url()));
    await page.goto("/proof.html");

    await page.keyboard.press("Tab");
    await expect(page.locator(".skip")).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/proof\.html#main$/);

    await page.locator("main").press("ArrowRight");
    await expect(page.locator("#trace .step").first()).toBeVisible();
    await expect(page.locator("#live")).toContainText("Step 1 of 8");

    const controls = page.locator("button:visible, a:visible");
    for (let index = 0; index < (await controls.count()); index += 1) {
      await expect(controls.nth(index)).toHaveAccessibleName(/\S+/);
    }
    expect(requests.every((url) => new URL(url).hostname === "127.0.0.1")).toBe(
      true,
    );
  });

  test("invalid fixture reports a user-facing error without throwing", async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/proof.html");
    await page.evaluate(() => {
      document.getElementById("fixture").textContent = "{";
      const script = document.createElement("script");
      script.src = "assets/proof.js";
      document.body.append(script);
    });
    await expect(page.locator("#live")).toHaveText(
      "Fixture could not be parsed.",
    );
    expect(errors).toEqual([]);
  });

  test("untrusted proof fixture fields stay literal text", async ({ page }) => {
    const payload =
      '<img src="x" onerror="window.__web02Executed = true"><script>window.__web02Executed = true</script><button onclick="window.__web02Executed = true">click</button>';
    await page.route("**/proof.html", async (route) => {
      const response = await route.fetch();
      const html = await response.text();
      const mutated = html.replace(
        /(<script type="application\/json" id="fixture">)[\s\S]*?(<\/script>)/,
        (_, opening, closing) => {
          const fixture = JSON.parse(
            html.match(
              /<script type="application\/json" id="fixture">([\s\S]*?)<\/script>/,
            )[1],
          );
          fixture.steps[0].action = payload;
          fixture.steps[0].input = { untrusted: payload };
          fixture.steps[0].result = payload;
          fixture.steps[0].boundary = payload;
          fixture.steps[0].source_test = payload;
          const serialized = JSON.stringify(fixture).replaceAll("<", "\\u003c");
          return `${opening}${serialized}${closing}`;
        },
      );
      await route.fulfill({ response, body: mutated });
    });

    await page.goto("/proof.html");
    await page.locator("#step").click();
    const step = page.locator("#trace .step").first();
    await expect(step.locator(".step__action")).toHaveText(payload);
    await expect(step.locator("dd").nth(0)).toHaveText(`untrusted: ${payload}`);
    await expect(step.locator("dd").nth(1)).toHaveText(payload);
    await expect(step.locator("dd").nth(2)).toHaveText(payload);
    await expect(step.locator("a")).toHaveText(`source test: ${payload}`);

    const rendered = await step.evaluate((node) => ({
      childElements: node.querySelectorAll(
        "img, script, button, [onerror], [onclick]",
      ).length,
      javascriptLinks: node.querySelectorAll('a[href^="javascript:"]').length,
      executed: node.ownerDocument.defaultView.__web02Executed ?? null,
    }));
    expect(rendered).toEqual({
      childElements: 0,
      javascriptLinks: 0,
      executed: null,
    });
  });

  test("reduced motion completes the proof immediately", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/proof.html");
    // Inspect immediately after the click handler, with no assertion auto-wait.
    const status = await page.locator("#run").evaluate((button) => {
      button.click();
      return document.getElementById("live").textContent;
    });
    expect(status).toContain("Replay complete: 8 of 8 steps");
    await expect(page.locator("#live")).toContainText(
      "Replay complete: 8 of 8 steps",
    );
    await expect(page.locator("#trace .step")).toHaveCount(8);
    await expect(page.locator("#trace .step").first()).toBeVisible();
    await expect(page.locator("#trace")).toHaveAttribute(
      "data-final-hash",
      /^[0-9a-f]{8}$/,
    );
  });
});
