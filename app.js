import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { launchHN } from './hn_scrape.js';
import { launchJH } from './jhu_scrape.js';
import { launchBBC } from './bbc_scrape.js';
import { launchDR } from './dr_scrape.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

app.use(cors());

const members = [
  {
    name: 'Jake',
    id: '1',
  },
  {
    name: 'John',
    id: '2',
  },
];

// json and url encoded are used for POST and PUT requests because data needs to be sent as data object
// json is built in method to recognize incoming data object as JSON
app.use(express.json());
// urlencoded is to recognize object as strings or arrays
app.use(express.urlencoded({ extended: true, useNewURrlParser: true }));

// simple api

app.get('/api/members', (req, res) => {
  res.json(members);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });
}

// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/json', express.static(path.join(__dirname, '../public', 'json')));

// app.get('/scrape', function (req, res) {
//   launchJH();
//   // launchHN();
//   // launchBBC();
//   // launchDR();
//   res.send('Scrape Successful');
// });

app.listen(PORT, () => {
  console.log(`Application now listening at http://localhost:${PORT}`);
});
