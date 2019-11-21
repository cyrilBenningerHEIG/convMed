
const Quiz = require('../models/quiz');


const express = require('express');
const router = express.Router();

/*
router.get('/', (req, res) => {
  res.send('Api router');
});
*/


router.get('/data', dataHandler, function(req, res, next) {
  res.render('index', { title: 'Express' });
});




function dataHandler(req, res) {
  getData()
    .then(data => {
      res.json(data);
    });
}

module.exports = router;
