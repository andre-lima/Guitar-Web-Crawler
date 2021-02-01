let cron = require('node-cron');
let scraper = require('./index.js');
const { sendEmail } = require('./email');

const schedule = '0 * * * *';

sendEmail('Schedule started', 'Schedule ' + schedule);
cron.schedule(schedule, () => {
  scraper();
});