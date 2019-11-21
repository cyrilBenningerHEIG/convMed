const Quiz = require('../models/quiz');
const express = require('express');
const { data } = require('../Seed/data');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { gameTitle1: 'Matche ta viande', gameTitle2: 'Devine l\'auteur' });
});

/* GET question page. */
router.get('/question', function(req, res, next) {
  res.render('question', { typeQuiz: true, qContent:'myCitation' qNumber: 'Q', reponse1: 'Canard', reponse2: 'Poulet', reponse3: 'Boeuf', reponse4: 'Porc' });
});

/* GET reponse page */
router.get('/reponse', function(req, res, next) {
  res.render('reponse', { reponseFaux: false});
});


/* GET reponse page -VRAI */
router.get('/reponseFAUX', function(req, res, next) {
  res.render('reponseFAUX', { fauxVar: 'FAUX'});
});
router.get('/match', function (req, res, next) {
  let question=Quiz.find({type:'1'}).exec();
  res.json(question);
  //res.render('index', { title: 'Express' });
});
router.get('/Citations', function (req, res, next) {
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



module.exports = router;
