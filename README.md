# Guitar Web Crawler

I wanted a guitar. No stores had it. Nobody on Kijiji was selling it. Checking the store sites was getting tiring.

*SPOILER ALERT: IT WORKED! I bought the guitar.*

## Solution

I built this Web Crawler to visit a few chosen store sites and verify if the guitar i wanted was available.

It uses Puppeteer to crawl the pages, SendGrid to send me an email with a crawl summary, and everything is schedule with a CRON job in a Raspberry Pi.
