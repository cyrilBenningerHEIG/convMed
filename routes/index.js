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

  res.render('reponse', { reponseFaux: true, vraiVar: 'Vrai', fauxVar: 'Faux' });
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
    if (localStorage.getItem("count") == null || localStorage.getItem("count") >= question.length) {
      counter = localStorage.setItem("count", 0);
      counters = 0;
    } else {
      counters = parseInt(localStorage.getItem("count"));
      counters++;
      counter = localStorage.setItem("count", counters);
    }
    console.log(counters)
    res.render('question', { qNumber: 'Q', reponse1: question[counters].repjuste, reponse2: question[counters].repfausse1, reponse3: question[counters].repfausse2, reponse4: question[counters].repfausse3, type: question[counters].type, contenu: question[counters].questionimg })
    //res.send(question);
  });

  router.get('/quote', async function (req, res, next) {
    question = await Quiz.find({ type: false }).sort("_id");
    res.render('question', { qNumber: 'Q', reponse1: question[0].repjuste, reponse2: question[0].repfausse1, reponse3: question[0].repfausse2, reponse4: question[0].repfausse3, type: question[0].type, contenu: question[0].questiontxt })
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
