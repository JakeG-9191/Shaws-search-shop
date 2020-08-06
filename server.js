import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { launchHN } from './hn_scrape.js';
import { launchJH } from './jhu_scrape.js';
import { launchBBC } from './bbc_scrape.js';
import { launchDR } from './dr_scrape.js';

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

app.get('/scrape', function (req, res) {
  launchJH();
  res.send({ some: 'json' });
});

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/json', express.static(path.join(__dirname, 'json')));

app.listen(PORT, () => {
  console.log(`Application now listening at http://localhost:${PORT}`);
});
