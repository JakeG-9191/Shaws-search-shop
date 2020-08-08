import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import chalk from 'chalk';

import fs from 'fs';

const error = chalk.bold.red;
const success = chalk.keyword('green');

export async function HN() {
  console.log(success('HackerNews Scrape Starting'));
  const browser = await puppeteer.launch({ headless: true });
  try {
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
    // console.log(news);
    fs.writeFile(
      'client/src/json/hackernews.json',
      JSON.stringify(news),
      function (err) {
        if (err) throw err;
        console.log('Saved New File Successfully - HackerNews');
      }
    );
    console.log(success('browser closed'));
  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error('browser closed'));
  }
}

export function launchHN() {
  HN();
  return console.log(`launched HN Scrape`);
}
