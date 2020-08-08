import path from 'path';
import router from 'express';
import { launchJH } from '../jhu_scrape.js';

// // Scrape Routes
// router.use('/scrape', launchJH());

// router.use(function (req, res) {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

export function scrape() {
  router.use('/scrape', launchJH());
}
