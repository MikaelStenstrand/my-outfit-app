describe('Example', () => {
  beforeEach(async () => {
    await device.relaunchApp();
  });

  it('shoud navigate to garment creation screen', async () => {
    await waitFor(element(by.id('garmentCreateButton'))).toBeVisible().withTimeout(5000);
    await expect(element(by.id('garmentCreateButton'))).toBeVisible();
    await element(by.id('garmentCreateButton')).tap();

    await waitFor(element(by.id('garmentCreationView'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('garmentCreationView'))).toBeVisible();
  });

});