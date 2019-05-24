async function main() {
  const webdriverio = require('webdriverio');

  const browserOptions = {
    remoteHost: "http://localhost:4444",
    desiredCapabilities: {
      browserName: 'chrome',
    }
  };
  const driver = webdriverio.remote(browserOptions);
  let browser = driver.init();

  const {Eyes, By} = require('@applitools/eyes.webdriverio');
  let eyes = new Eyes();
  eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

  try {
    await eyes.open(browser, 'Hello World!', 'My first Javascript test!', {width: 800, height: 600});

    await browser.url('https://www.magicleap.com');

    const R3 = {left: 0, top: 0, width: 1920, height: 937};
    await eyes.checkRegionBy(R3, 'Main Page', 5);

    await eyes.checkRegionBy(By.xPath('//*[@id="home-hero"]/h1'), '2', 5);

    await eyes.checkElementBySelector(By.xPath('//*[@id="menuItem_MagicLeapOne"]'), 5, '2');

    await eyes.close(false);

  } catch (e) {
    console.log(e);
  } finally {
    await browser.end();
    await eyes.abortIfNotClosed();
  }
}

main();
