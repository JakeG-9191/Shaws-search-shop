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

async function JHU() {
  console.log(alert('JHU Scrape Starting'));
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
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
          title: updatedTitle[i].innerHTML.trim(),
          nums: updatedNumbers[i].innerHTML.trim(),
        };
      }
      return figureArray;
    });
    await browser.close();
    // console.log(newFigures);
    fs.writeFile(
      'client/src/json/jhucovid.json',
      JSON.stringify(newFigures),
      function (err) {
        if (err) throw err;
        console.log('Saved New File Successfully - JHU');
      }
    );
    console.log(success('Browser Closed'));
  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error('Browser Closed With Error!'));
  }
}

function launchJH() {
  let date = Date();
  let format = date.toString();
  console.log(`Date and time is: ${format}`);
  JHU();
  return console.log(`launched JHU Scrape`);
}

module.exports = launchJH;
