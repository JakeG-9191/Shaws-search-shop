const express = require('express');
const logger = require('morgan');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');

const db = require('./models');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require('./routes/apiRoutes')(app);
require('./routes/html')(app);

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/Shaws-Search-App';
mongoose.connect(MONGODB_URI);

// mongoose.connect("mongodb://localhost/WashingtonPost", { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost/WashingtonPost", function () {
//     mongoose.connection.db.dropDatabase()
// });

app.listen(PORT, function () {
  console.log('App running on port ' + PORT + '!');
});
