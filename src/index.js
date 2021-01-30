// const sendEmail = require('./email');
const { startBrowser } = require('./browser');
const scraperController = require('./pageController');


function startScraping() {
  console.log('Started scraping.');
  //Start the browser and create a browser instance
  let browserInstance = startBrowser();

  // Pass the browser instance to the scraper controller
  scraperController(browserInstance)
}

module.exports = startScraping;