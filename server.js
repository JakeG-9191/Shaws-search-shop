import express from 'express';
// import { launchHN } from './hn_scrape.js';
// import { launchJH } from './jhu_scrape.js';
import { launchBBC } from './bbc_scrape.js';

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Application now listening at http://localhost:${port}`);
});

// launchHN();
// launchJH();
launchBBC();
