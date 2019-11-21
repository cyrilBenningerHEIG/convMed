const Quiz = require('../models/quiz');
const express = require('express');
const { data } = require('../Seed/data');
const router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { gameTitle1: 'Matche ta viande', gameTitle2: 'Devine l\'auteur' });
});

/* GET question page. */
// router.get('/question', function(req, res, next) {
//   //sres.render('question', { typeQuiz: true, qContent:'myCitation' qNumber: 'Q', reponse1: 'Canard', reponse2: 'Poulet', reponse3: 'Boeuf', reponse4: 'Porc' });
// });

/* GET reponse page */
router.get('/reponse', function (req, res, next) {

  res.render('reponse', { reponse: false, vraiVar: 'Vrai', fauxVar: 'Faux' });
});

  /* GET reponse page -KSEKSE */
  router.get('/ksekse', function (req, res, next) {
    res.render('ksekse');
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
    if (localStorage.getItem("countMeat") == null || localStorage.getItem("countMeat") >= 9) {
      counter = localStorage.setItem("countMeat", 0);
      counters = 0;
    } else {
      counters = parseInt(localStorage.getItem("countMeat"));
      counters++;
      counter = localStorage.setItem("countMeat", counters);
    }
    console.log(counters)
    res.render('question', { qNumber: 'Q', reponse1: question[counters].repjuste, reponse2: question[counters].repfausse1, reponse3: question[counters].repfausse2, reponse4: question[counters].repfausse3, type: question[counters].type, contenu: question[counters].questionimg })
    //res.send(question);
  });

  router.get('/quote', async function (req, res, next) {
    question = await Quiz.find({ type: false }).sort("_id");
    var counterQuote = null;
    var LocalStorage = require('node-localstorage').LocalStorage,
      localStorage = new LocalStorage('./scratch');
    if (localStorage.getItem("countQuote") == null || localStorage.getItem("countQuote") >= 9) {
      counterQuote = localStorage.setItem("countQuote", 0);
      countersQuote = 0;
    } else {
      countersQuote = parseInt(localStorage.getItem("countQuote"));
      countersQuote++;
      counterQuote = localStorage.setItem("countQuote", countersQuote);
    }
    res.render('question', { qNumber: 'Q', reponse1: question[countersQuote].repjuste, reponse2: question[countersQuote].repfausse1, reponse3: question[countersQuote].repfausse2, reponse4: question[countersQuote].repfausse3, type: question[countersQuote].type, contenu: question[countersQuote].questiontxt })
    //res.send(question);
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
