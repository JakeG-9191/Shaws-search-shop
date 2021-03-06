// import cheerio from 'cheerio';
// import puppeteer from 'puppeteer';
// import chalk from 'chalk';

// import fs from 'fs';

const puppeteer = require('puppeteer');
const chalk = require('chalk');
const fs = require('fs');

const error = chalk.bold.red;
const success = chalk.keyword('green');
const alert = chalk.keyword('yellow');

async function BBC() {
  console.log(alert('BBC Scrape Starting'));
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.goto(`https://www.bbc.com/news`);
    await page.waitForSelector(`ol.gel-layout__item`);

    const updatedBBC = await page.evaluate(() => {
      let allnewFigures = document.querySelectorAll(
        `div.nw-c-most-read > div.gel-wrap > div.nw-c-most-read__items > ol > li`
      );
      let updatedNumbers = document.querySelectorAll(
        `span.nw-c-most-read__rank`
      );
      let updatedLink = document.querySelectorAll(
        `div.gs-o-media__body > a.gs-c-promo-heading`
      );
      let updatedTitle = document.querySelectorAll(
        `a.gs-o-faux-block-link__overlay-link > span.gs-c-promo-heading__title`
      );
      let figureArray = [];
      for (let i = 0; i < allnewFigures.length; i++) {
        figureArray[i] = {
          title: updatedTitle[i].innerText.trim(),
          nums: updatedNumbers[i].innerText.trim(),
          link: updatedLink[i].getAttribute(`href`),
        };
      }
      return figureArray;
    });
    await browser.close();
    // console.log(updatedBBC);
    fs.writeFile(
      'client/src/json/bbc.json',
      JSON.stringify(updatedBBC),
      function (err) {
        if (err) throw err;
        console.log('Saved New File Successfully - BBC');
      }
    );
    console.log(success('Browser Closed'));
  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error('Browser Closed With Error!'));
  }
}

function launchBBC() {
  console.log(`Date and time is: ${Date.now().toString()}`);
  BBC();
  return console.log(`launched BBC Scrape`);
}

module.exports = launchBBC;
