import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import axios from 'axios';

const url = 'https://coronavirus.jhu.edu/';

puppeteer
  .launch()
  .then((browser) => browser.newPage())
  .then((page) => {
    return page.goto(url).then(function () {
      return page.content();
    });
  })
  .then((html) => {
    const $ = cheerio.load(html);
    const newsHeadlines = [];
    $('article > ul > li > figure').each(function () {
      newsHeadlines.push({
        title: $(this).text(),
      });
    });

    return console.log(newsHeadlines);
  })
  .catch(console.error);
