import { test, expect } from "@playwright/test";
test("Image upload renders on canvas", async ({ page }) => {
  // Navigate to the page
  await page.goto("/");

  const imagePath = "./e2e-tests/assets/epam.png";

  const fileInput = await page.$('input[type="file"]');
  await fileInput?.setInputFiles(imagePath);

  await page.waitForSelector("canvas");

  const canvasBase64 = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    return canvas?.toDataURL();
  });

  expect(canvasBase64).not.toBe("data:,"); // Ensure the canvas is not empty
});

test("Offset sliders are set correctly after horizontal image is first time rendered on canvas", async ({
  page,
}) => {
  // Navigate to the page
  await page.goto("/");

  const imagePath = "./e2e-tests/assets/epam.png";
  const fileInput = await page.$('input[type="file"]');
  await fileInput?.setInputFiles(imagePath);

  const offsetXInput = page.locator('input[name="offsetX"]');

  const offsetXValue = await offsetXInput?.evaluate((input) =>
    Math.ceil(parseFloat((input as HTMLInputElement).value))
  );
  expect(offsetXValue).toBe(-102);

  const offsetYInput = page.locator('input[name="offsetY"]');

  const offsetYValue = await offsetYInput?.evaluate((input) =>
    Math.ceil(parseFloat((input as HTMLInputElement).value))
  );

  expect(offsetYValue).toBe(0);

  await expect(offsetYInput).toBeDisabled();
});

test("Offset sliders are set correctly after vertical image is first time rendered on canvas", async ({
  page,
}) => {
  // Navigate to the page
  await page.goto("/");

  const imagePath = "./e2e-tests/assets/epam2.webp";
  const fileInput = await page.$('input[type="file"]');
  await fileInput?.setInputFiles(imagePath);

  const offsetXInput = page.locator('input[name="offsetX"]');
  const offsetXValue = await offsetXInput?.evaluate((input) =>
    Math.ceil(parseFloat((input as HTMLInputElement).value))
  );
  expect(offsetXValue).toBe(0);
  await expect(offsetXInput).toBeDisabled();

  const offsetYInput = page.locator('input[name="offsetY"]');
  const offsetYValue = await offsetYInput?.evaluate((input) =>
    Math.ceil(parseFloat((input as HTMLInputElement).value))
  );

  expect(offsetYValue).toBe(-180);
});

test("The prompt is shown after clicking on a 'Save Project' button", async ({
  page,
}) => {
  // Navigate to the page
  await page.goto("/");

  const imagePath = "./e2e-tests/assets/epam2.webp";
  const fileInput = await page.$('input[type="file"]');
  await fileInput?.setInputFiles(imagePath);

  page.on("dialog", (dialog) => dialog.accept());

  const [promptDialog] = await Promise.all([
    page.waitForEvent("dialog"), // Wait for the dialog event
    page.locator('button:text("Save Project")').click(),
  ]);

  expect(promptDialog.message()).toBe("Enter a custom file name (optional):");
});

test('Clicking the "Load project" button triggers change event of input type file and opens file chooser dialog', async ({
  page,
}) => {
  // Navigate to the page
  await page.goto("/");

  // Intercept and handle the file chooser dialog
  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    page.locator('button:text("Load Project")').click(),
  ]);

  expect(fileChooser).toBeTruthy();
});
