const Quiz = require('../models/quiz');
const express = require('express');
const { data } = require('../Seed/data');
const router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { gameTitle1: 'Matche ta viande', gameTitle2: 'Devine l\'auteur' });
});

/* GET question page. */
router.get('/question', function (req, res, next) {
  res.render('question', { qNumber: 'Q', reponse1: 'Canard', reponse2: 'Poulet', reponse3: 'Boeuf', reponse4: 'Porc' });
});

/* GET reponse page */
router.get('/reponse', function (req, res, next) {
  res.render('reponse', { reponseFaux: true });
});


/* GET reponse page -VRAI */
router.get('/reponseFAUX', function (req, res, next) {
  res.render('reponseFAUX', { fauxVar: 'FAUX' });
});
router.get('/match', async function (req, res, next) {
  question = await Quiz.find({ type: true }).sort("_id");
  var counter = null;
  var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
  if (localStorage.getItem("count") == null || localStorage.getItem("count")>=9) {
    counter = localStorage.setItem("count", 0);
    counters = 0;
  } else {
    counters = parseInt(localStorage.getItem("count"));
    counters++;
    counter = localStorage.setItem("count", counters);
  }
  console.log(counters)
  res.render('question', { qNumber: 'counters'+1, contenu: question[counters].questionimg, reponse1: question[counters].repjuste, reponse2: question[counters].repfausse1, reponse3: question[counters].repfausse2, reponse4: question[counters].repfausse3, type: question.type })
  //res.send(question);
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

async function GetData(typeQuiz) {
  let question = await Quiz.find({ type: typeQuiz });

  return question;
}


module.exports = router;
