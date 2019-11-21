const Quiz = require('../models/quiz');
const express = require('express');
const { data } = require('../Seed/data');
const router = express.Router();

/*
router.get('/', (req, res) => {
  res.send('Api router');
});
*/


router.get('/MatchTaViande', dataHandler, function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Citations', dataHandler, function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/seed', function (req, res, next) {
  Quiz.remove({}, function (err) {
    console.log('collection removed')
  });
  let seed = data;
  Quiz.create(seed);
  res.send(seed);
});


function getData() {
  return Quiz.find();
}

function dataHandler(req, res) {
  getData()
    .then(data => {
      res.json(data);
    });
}


module.exports = router;
