var express = require('express');
var router = express.Router();
const Quiz = require('../models/quiz');
module.exports = router;


const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('Api router');
});

router.get('/data', dataHandler)

module.exports = router;

function dataHandler(req, res) {
  getData()
    .then(data => {
      res.json(data);
    });
}