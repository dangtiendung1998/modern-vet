const {getDriver, buildDriver} = require("../core/driver.js");
await buildDriver('chrome');
let driver = getDriver()
async function main() {
    await driver.get('https://staging-portal.xl-mordern-pet.com')

    await driver.wait(async () => {
        let url = await driver.getCurrentUrl();
        return url.contains('https://staging-portal.xl-mordern-pet.com');
    }, 3000, 'timeout wait for url');
}

await main();