let cron = require('node-cron');
let scraper = require('./index.js');

cron.schedule('5 * * * *', () => {
  scraper();
});