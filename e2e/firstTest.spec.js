describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should successfully render app', async () => {
    const test = await element(by.text('Username *'))
    console.log(test);
  });

  // it('should have welcome screen', async () => {
  //   await expect(element(by.id('garment-create-button'))).toBeVisible();
  // });

  // it('should navigate to garment creation view on tap', async () => {
  //   await element(by.id('garment-create-button')).tap();
  //   await expect(element(by.id('garment-creation-view'))).toBeVisible();
  // });

})