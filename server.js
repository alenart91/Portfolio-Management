

require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
// const bodyParser = require('body-parser');

const app = express();
const port = 4000;
const apiKey = process.env.API_KEY;

const getTokens = () => {
  fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
    headers: {
      'X-CMC_PRO_API_KEY': apiKey
    }
  })
  .then( (res) => {
    console.log(res);
    return res.json();
  })
  .then( (data) => {
    console.log(data);
    return data;
  })
};

// app.use(bodyParser.json());

app.get('/test', (req, res) => {
  // res.header("Access-Control-Allow-Origin", '*');
  // res.set('Content-Type', 'application/json');

  // turn this into variable and import it globally
  fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
    headers: {
      'X-CMC_PRO_API_KEY': apiKey
    }
  })
  .then( (res) => {
    console.log(res);
    return res.json();
  })
  .then( (data) => {
    console.log(data);
    res.send({data});
  })
  // res.json({Data: 'hello alex test'});
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
