import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import chalk from 'chalk';

import fs from 'fs';

// const url = 'https://coronavirus.jhu.edu/';

// puppeteer
//   .launch({ headless: false })
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

//     return console.log(newsHeadlines);
//   })
//   .catch(console.error);

const error = chalk.bold.red;
const success = chalk.keyword('green');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://news.ycombinator.com/`);
    await page.waitForSelector(`a.storylink`);

    const news = await page.evaluate(() => {
      var titleNodeList = document.querySelectorAll(`a.storylink`);
      var ageList = document.querySelectorAll(`span.age`);
      var scoreList = document.querySelectorAll(`span.score`);
      var titleLinkArray = [];
      for (let i = 0; i < titleNodeList.length; i++) {
        titleLinkArray[i] = {
          title: titleNodeList[i].innerText.trim(),
          link: titleNodeList[i].getAttribute(`href`),
          age: ageList[i].innerText.trim(),
          score: scoreList[i].innerText.trim(),
        };
      }
      return titleLinkArray;
    });
    await browser.close();
    console.log(news);
    // fs.writeFile('hackernews.json', JSON.stringify(news), function (err) {
    //   if (err) throw err;
    //   console.log('Saved');
    // });
    console.log(success('browser closed'));
  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error('browser closed'));
  }
})();

// const url =
//   'https://www.ticketmaster.com/search?radius=75&sort=date%2Casc&unit=miles&tab=events&daterange=all';

// puppeteer
//   .launch({ headless: false })
//   .then((browser) => browser.newPage())
//   .then((page) => {
//     return page.goto(url).then(function () {
//       return page.content();
//     });
//   })
//   .then((html) => {
//     const $ = cheerio.load(html);
//     const newsHeadlines = [];
//     $(
//       'div.visibility-container > div.event-listing > div.accordion-wrapper > div.event-listing__item > div.inactive > div.accordion_panel > div.minHeight > section.event-list-panel-item--lineUp > div.eVdrog > div.event__list__link > div.hTRmfd > a.event-tile__link'
//     ).each(function () {
//       newsHeadlines.push({
//         title: $(this).text(),
//       });
//     });

//     return console.log(newsHeadlines);
//   })
//   .catch(console.error);
