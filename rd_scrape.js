// import cheerio from 'cheerio';
// import puppeteer from 'puppeteer';
// import chalk from 'chalk';

// import fs from 'fs';

// const error = chalk.bold.red;
// const success = chalk.keyword('green');

// export async function Reddit() {
//   console.log(success('Reddit Scrape Starting'));
//   try {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.goto(`https://www.reddit.com/r/harrypotter/`);
//     await page.waitForSelector(`div._2QeqBqfT5UbHBoViZUt-wX`);

//     const updatedReddit = await page.evaluate(() => {
//       let allnewFigures = document.querySelectorAll(
//         `_2vEf-C2keJaBMY9qk_BxVn`
//       );
//       let updatedTitle = document.querySelectorAll(`figure > figcaption`);
//       let updatedNumbers = document.querySelectorAll(`figure > p`);
//       let figureArray = [];
//       for (let i = 0; i < allnewFigures.length; i++) {
//         figureArray[i] = {
//           title: updatedTitle[i].innerHTML.trim(),
//           nums: updatedNumbers[i].innerHTML.trim(),
//         };
//       }
//       return figureArray;
//     });
//     await browser.close();
//     console.log(updatedReddit);
//     // fs.writeFile('reddit.json', JSON.stringify(newFigures), function (err) {
//     //   if (err) throw err;
//     //   console.log('Saved New File Successfully - Reddit');
//     // });
//     console.log(success('Browser Closed'));
//   } catch (err) {
//     console.log(error(err));
//     await browser.close();
//     console.log(error('Browser Closed With Error!'));
//   }
// }

// export function launchRD() {
//   Reddit();
//   return console.log(`launched JHU Scrape`);
// }
