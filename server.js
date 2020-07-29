import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import axios from 'axios';

// const url = 'https://coronavirus.jhu.edu/';

// puppeteer
//   .launch()
//   .then((browser) => browser.newPage())
//   .then((page) => {
//     return page.goto(url).then(function () {
//       return page.content();
//     });
//   })
//   .then((html) => {
//     const $ = cheerio.load(html);
//     const newsHeadlines = [];
//     $('article > ul > li > figure').each(function () {
//       newsHeadlines.push({
//         title: $(this).text(),
//       });
//     });

//     console.log(newsHeadlines);
//   })
//   .catch(console.error);

const my_tag = 'devjam';

const url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=Tr04RiGjZx5e9SG89GdLfv6yAoHYvaZG`;

axios(url)
  .then((response) => {
    const res_length = Object.keys(response.data._embedded.events);
    const html = response.data._embedded.events[19].name;
    console.log(res_length);
    console.log(`this is the last event, ${html}`);
  })
  .catch(console.error);
