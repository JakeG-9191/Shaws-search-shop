import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

const url = 'https://www.reddit.com/r/harrypotter/';

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
    $('a[href*="/r/harrypotter/comments"] > div > h3').each(function () {
      newsHeadlines.push({
        title: $(this).text(),
      });
    });

    console.log(newsHeadlines);
  })
  .catch(console.error);
