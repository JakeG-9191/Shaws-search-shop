import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import chalk from 'chalk';

import fs from 'fs';

const error = chalk.bold.red;
const success = chalk.keyword('green');

export async function BBC() {
  console.log(success('BBC Scrape Starting'));
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://www.bbc.com/news`);
    await page.waitForSelector(`ol.gs-u-display-none@xs`);

    const updatedBBC = await page.evaluate(() => {
      let allnewFigures = document.querySelectorAll(`gel-layout__item`);
      let updatedTitle = document.querySelectorAll(`span.nw-c-most-read__rank`);
      let updatedNumbers = document.querySelectorAll(
        `span.gs-c-promo-heading__title`
      );
      let figureArray = [];
      for (let i = 0; i < allnewFigures.length; i++) {
        figureArray[i] = {
          title: updatedTitle[i].innerHTML.trim(),
          nums: updatedNumbers[i].innerHTML.trim(),
        };
      }
      return figureArray;
    });
    await browser.close();
    console.log(updatedBBC);
    // fs.writeFile('reddit.json', JSON.stringify(newFigures), function (err) {
    //   if (err) throw err;
    //   console.log('Saved New File Successfully - Reddit');
    // });
    console.log(success('Browser Closed'));
  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error('Browser Closed With Error!'));
  }
}

export function launchBBC() {
  BBC();
  return console.log(`launched BBC Scrape`);
}
