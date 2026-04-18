const webdriver = require("selenium-webdriver");

require("chromedriver");
const chrome = require("selenium-webdriver/chrome");
let driver;

const buildChromeDriver = () => {
    const options = new chrome.Options();
    options.setPageLoadStrategy("normal");
    options.excludeSwitches("enable-logging"); // Loại bỏ đối số log
    options.excludeSwitches("enable-automation"); // Loại bỏ đối số automation
    options.addArguments("--lang=vi"); // set language chrome
    options.addArguments("--disable-popup-blocking"); // tắt thông báo
    options.addArguments("--disable-notifications"); // tắt thông báo
    options.addArguments("--disable-infobars"); //
    options.addArguments("--disable-gpu"); // tắt GPU
    options.addArguments("--disable-extensions"); // vô hiệu hóa extension
    // options.addArguments("--window-size=1920,1080"); // set kích thước hiển thị
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments("--disable-browser-side-navigation");
    options.addArguments("--incognito"); // disable save password

    var caps = { browserName: 'chrome', unexpectedAlertBehaviour: 'ignore' };
    return new webdriver.Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .withCapabilities(caps)
        .build();
};

// const buildChromeHeadlessDriver = () => {
//     var chrome = require("selenium-webdriver/chrome");
//     var chromeOptions = new chrome.Options();
//     chromeOptions.setPageLoadStrategy("normal");
//     chromeOptions.excludeSwitches("enable-logging");
//     chromeOptions.addArguments("enable-automation");
//     chromeOptions.addArguments("start-maximized");
//     chromeOptions.addArguments("headless");
//     chromeOptions.addArguments("--disable-infobars");
//     chromeOptions.addArguments("--disable-extensions");
//     chromeOptions.addArguments("--disable-gpu");
//     chromeOptions.addArguments("--disable-dev-shm-usage");
//     chromeOptions.addArguments("window-size=1920,1080");
//     chromeOptions.addArguments("no-sandbox");
//     chromeOptions.addArguments("--disable-dev-shm-usage");
//     chromeOptions.addArguments("--disable-browser-side-navigation");
//     chromeOptions.addArguments("--incognito"); // not save password
//
//     // driver.manage().timeouts().implicitlyWait(20000) ;
//     return new webdriver.Builder()
//         .forBrowser("chrome")
//         .setChromeOptions(chromeOptions)
//         .setChromeService(new chrome.ServiceBuilder(process.env.CHROME_DRIVER_PATH))
//         .build();
// };

/**
 * Creates new WebDriver instances
 * @param {string} browser Browser names (chrome, browserstack)
 */
const buildDriver = async (browser) => {
    console.log('🚀 driver.js ~ buildDriver()', browser.toLowerCase());
    // try {
        switch (browser.toLowerCase()) {
            case "chrome":
                driver = buildChromeDriver();
                break;
            // case "chrome-headless":
            //     driver = buildChromeHeadlessDriver();
            //     break;
        }
    // } catch (e) {
    //     console.log(e.message);
    // }
    await driver.manage().setTimeouts({script: 2000, implicit: 2000, page: 2000});
    await driver.manage().window().maximize();
};

/**
 * @return The WebDriver instance
 */
const getDriver = () => {
    return driver;
};

module.exports = {getDriver, buildDriver};
