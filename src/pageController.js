const pageScraper = require('./pageScraper');
const { sendEmail } = require('./email');
const { emailController } = require('./emailController');

async function scrapeAll(browserInstance) {
  let browser;

  try {
    browser = await browserInstance;

    const pages = [
      { name: 'lm', url: 'https://www.long-mcquade.com/112559/Guitars/Electric-Guitars/Fender-Musical-Instruments/J-Mascis-Signature-Jazzmaster---Vintage-White.htm' },
      { name: 'steves', url: 'https://www.stevesmusic.com/en/product/squier-j-mascis-jazzmaster-laurel-fingerboard-vintage-white-0371060541.html' },
      { name: 'archambault', url: 'https://www.archambault.ca/instruments/guitare-%C3%A9lectrique-jazzmaster-mascis-blanche/%C3%A9tui-non-inclus/0301060541/?id=2060994&cat=1884314' },
      { name: 'diplomatique', url: 'https://www.musiquediplomate.com/product/squier-j-mascis-jazzmaster-vintage-white/' },
      { name: 'kijiji', url: 'https://www.kijiji.ca/b-quebec/mascis/k0l9001?rb=true&dc=true' },
      { name: 'kijiji', url: 'https://www.kijiji.ca/b-guitare/quebec/jazzmaster/k0c613l9001?rb=true' }
    ];

    const finalResult = [];

    const currentHour = new Date().getHours();

    // Only scrape between 7h and 18h.
    if (currentHour >= 7 && currentHour <= 18) {
      for await (page of pages) {
        try {
          let result = await pageScraper.scraper(browser, page.url, page.name);
          finalResult.push(result);
        } catch (error) {
          finalResult.push({ store: 'ERROR', title: page.name, isAvailable: false, comment: "crap..." });
        }
      }
    } else {
      console.log('Not the right time for this.');
    }

    await browser.close();

    if (finalResult.length) {
      emailController(finalResult);
    }
  }
  catch (err) {
    console.log("Could not resolve the browser instance => ", err);
    if (browser) {
      await browser.close();
    }
    sendEmail('Something went wrong...', err)
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)