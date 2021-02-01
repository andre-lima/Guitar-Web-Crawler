const scraperObject = {
  async scraper(browser, url, type) {
    let page = await browser.newPage();
    console.log(`Navigating to ${url}...`);
    await page.goto(url);

    switch (type) {
      case 'steves':
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.product-single-details > h1.product-title');

        // Get the link to all the required books
        let steveTitle = await page.$eval('.product-single-details > h1.product-title', el => el.textContent);
        let steveStatus = await page.$eval('.product-single-details #stock-qty', el => el.textContent);
        return { store: 'Steve\'s \t', title: steveTitle, isAvailable: steveStatus !== 'Out of stock', comment: '' };
        break;

      case 'lm':
        // Wait for the required DOM to be rendered
        await page.waitForSelector('#product-stock-block');
        await page.waitForSelector('#product-in-store-block');


        // Get the link to all the required books
        const LmTitle = await page.$eval('#product-header-name', el => el.textContent);
        const onlineStock = await page.$eval('#product-stock-block span.label', el => el.textContent);
        const storeStock = await page.$('#product-in-store-block span.label-success');
        const stockDate = (await page.$eval('#product-stock-block span', el => el.textContent)).split('to have stock on ');

        let comment = stockDate[1] || '';

        return { store: 'L&M \t', title: LmTitle, isAvailable: onlineStock === 'In Stock' || !!storeStock, comment: comment };
        break;

      case 'archambault':
        // Wait for the required DOM to be rendered
        await page.waitForSelector('#p_lt_ctl14_pageplaceholder_p_lt_ctl00_ProductDetailsAR_productAvailabilityStatus');

        // Get the link to all the required books
        const archTitle = await page.$eval('.product-description__title', el => el.textContent);
        const archIsAvailable = await page.$('#p_lt_ctl14_pageplaceholder_p_lt_ctl00_ProductDetailsAR_productAvailable > span.message-status--success');

        return { store: 'Archambault \t', title: archTitle, isAvailable: !!archIsAvailable, comment: '' };
        break;

      case 'diplomatique':
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.summary-inner .stock');

        // Get the link to all the required books
        const diploTitle = await page.$eval('.product_title.entry-title', el => el.textContent);
        const diploIsAvailable = await page.$eval('.summary-inner .stock', el => el.textContent);

        return { store: 'Diplomatique', title: diploTitle, isAvailable: diploIsAvailable !== 'Out of stock', comment: '' };

      case 'kijiji':
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.container-results');

        const titles = await page.$$eval('.container-results .info-container > .title > a', el => el.map(e => e.innerText));

        const containsMascis = titles.some(title => {
          return title.toLowerCase().includes('mascis') && title !== 'Recherché : Recherche/want to buy: Squier J Mascis Jazzmaster';
        })

        return { store: `Kijiji \t`, title: `${titles.length} results`, isAvailable: containsMascis, comment: '' };
      default:
        break;
    }
  }
}

module.exports = scraperObject;