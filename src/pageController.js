const pageScraper = require('./pageScraper');
const { sendEmail } = require('./email');

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

    for await (page of pages) {
      let result = await pageScraper.scraper(browser, page.url, page.name);
      finalResult.push(result);
    }

    await browser.close();

    // Email formatting
    const emailSubject = `Is J Mascis available? ${finalResult.some(result => result.isAvailable) ? 'YES!' : 'no...'}`

    const emailBody = `<h1>Does someone have it: ${finalResult.some(result => result.isAvailable) ? 'YES!' : 'no...'} </h1>
    <div>
    <h2>Summary:</h2>
    ${(finalResult.map(r => `<p>${r.store} ${r.isAvailable} ${r.title}</p>`)).join('\n')}
    </div>`;

    console.log(emailSubject, emailBody);
    await sendEmail(emailSubject, emailBody);
  }
  catch (err) {
    console.log("Could not resolve the browser instance => ", err);
    sendEmail('Something went wrong...')
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)