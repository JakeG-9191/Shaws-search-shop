import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import chalk from 'chalk';

import fs from 'fs';

const error = chalk.bold.red;
const success = chalk.keyword('green');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://coronavirus.jhu.edu/`);
    await page.waitForSelector(`article.FeaturedStats_base__G1hZh`);

    const newFigures = await page.evaluate(() => {
      let allnewFigures = document.querySelectorAll(
        `li.FeaturedStats_stat__1MPv_`
      );
      let updatedTitle = document.querySelectorAll(`figure > figcaption`);
      let updatedNumbers = document.querySelectorAll(`figure > p`);
      let figureArray = [];
      for (let i = 0; i < allnewFigures.length; i++) {
        figureArray[i] = {
          // info: allnewFigures[i].innerText.trim(),
          title: updatedTitle[i].innerHTML.trim(),
          nums: updatedNumbers[i].innerHTML.trim(),
        };
      }
      return figureArray;
    });
    await browser.close();
    console.log(newFigures);
    console.log(success('Browser Closed'));
  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error('Browser Closed With Error!'));
  }
})();

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://news.ycombinator.com/`);
    await page.waitForSelector(`a.storylink`);

    const news = await page.evaluate(() => {
      let titleNodeList = document.querySelectorAll(`a.storylink`);
      let scoreList = document.querySelectorAll(`td.subtext`);
      let titleLinkArray = [];
      for (let i = 0; i < titleNodeList.length; i++) {
        titleLinkArray[i] = {
          title: titleNodeList[i].innerText.trim(),
          link: titleNodeList[i].getAttribute(`href`),
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
