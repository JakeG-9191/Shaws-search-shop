import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import chalk from 'chalk';

import fs from 'fs';

const error = chalk.bold.red;
const success = chalk.keyword('green');

export async function downRiver() {
  console.log(success('Down River Scrape Starting'));
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://www.downriverequip.com/staff.cfm`);
    await page.waitForSelector(`div.blog-news`);

    const dRScrape = await page.evaluate(() => {
      let allnewFigures = document.querySelectorAll(`div.nf-item`);
      let updatedTitle = document.querySelectorAll(
        `div.item-mask > div.item-caption > h5`
      );
      let figureArray = [];
      for (let i = 0; i < allnewFigures.length; i++) {
        figureArray[i] = {
          title: updatedTitle[i].innerHTML.trim(),
        };
      }
      return figureArray;
    });
    await browser.close();
    // console.log(dRScrape);
    fs.writeFile('dRstaff.json', JSON.stringify(dRScrape), function (err) {
      if (err) throw err;
      console.log('Saved New File Successfully - DR Staff');
    });
    console.log(success('Browser Closed'));
  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error('Browser Closed With Error!'));
  }
}

export async function downRiverDouble() {
  console.log(success('Down River Double Scrape Starting'));
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://www.downriverequip.com/boats-cid-2`);
    await page.waitForSelector(`div.item-box`);

    const dRDoubleScrape = await page.evaluate(() => {
      let itemOverallInfo = document.querySelectorAll(`div.nf-item`);
      let itemName = document.querySelectorAll(
        `div.item-box > div.shop-item-info > a > h6.shop-item-name`
      );
      let itemBrand = document.querySelectorAll(
        `div.shop-item-info > a > h6.shop-item-brand`
      );
      let itemPrice = document.querySelectorAll(`div.shop-item-price`);
      let figureArray = [];
      for (let i = 0; i < itemOverallInfo.length; i++) {
        figureArray[i] = {
          name: itemName[i].innerText.trim(),
          brand: itemBrand[i].innerText.trim(),
          price: itemPrice[i].innerText.trim(),
        };
      }
      return figureArray;
    });
    await browser.close();
    // console.log(dRDoubleScrape);
    fs.writeFile('dRboats.json', JSON.stringify(dRDoubleScrape), function (
      err
    ) {
      if (err) throw err;
      console.log('Saved New File Successfully - DR Boats');
    });
    console.log(success('Browser Closed'));
  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error('Browser Closed With Error!'));
  }
}

export function launchDR() {
  downRiver();
  downRiverDouble();
  return console.log(`launched Down River Scrape & DR Double Scrape`);
}