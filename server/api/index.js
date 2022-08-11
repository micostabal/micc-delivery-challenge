
const express = require('express');
const cors = require('cors');
const { controller } = require('../CLIMiddleware');


const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://micc-delivery-challenge-client.herokuapp.com/'
  );
  res.send('<b>Delivery System</b> Api here...');
});

app.get('/entries', async (req, res) => {
  const entries = await controller.handleGetEntriesRequest();
  console.info("[GET] /entries: Getting all entries");
  res.setHeader(
    'Access-Control-Allow-Origin',
    '*'
  );
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(
    entries
  ));
});

app.post('/distance-request', async (req, res) => {
  const {origin, destination} = req.body;
  const payload = await controller.handleOriginDestinationRequest(
    origin, destination
  );
  console.info(`[POST] /distance-request: Searching for request from ${
    origin
  } to ${destination}`);
  res.setHeader(
    'Access-Control-Allow-Origin',
    '*'
  );
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(
    payload
  ));
});

module.exports = {
  app
}