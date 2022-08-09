
const express = require('express');
const cors = require('cors');
const { controller } = require('../CLIMiddleware');


const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('<b>Delivery System</b> Api here...');
});

app.get('/entries', (req, res) => {
  const entries = controller.handleGetEntriesRequest();
  console.info("[GET] /entries: Getting all entries");
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
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(
    payload
  ));
});

module.exports = {
  app
}