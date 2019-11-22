const Quiz = require('../models/quiz');
const express = require('express');
const { data } = require('../Seed/data');
const router = express.Router();
var cookie = require('cookie');
var cookieParser = require('cookie-parser');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { gameTitle1: 'Matche ta viande', gameTitle2: 'Devine l\'auteur' });
});

/* GET question page. */
// router.get('/question', function(req, res, next) {
//   //sres.render('question', { typeQuiz: true, qContent:'myCitation' qNumber: 'Q', reponse1: 'Canard', reponse2: 'Poulet', reponse3: 'Boeuf', reponse4: 'Porc' });
// });

/* GET reponse page */
var jeu = ''
var quesitonType = 0
if (quesitonType){
  jeu = 'match'
}else {jeu='quote'}


router.get('/reponse', function (req, res, next) {
  res.render('reponse', { reponse: false, jeu: jeu, contenuTitle: 'Greta Thunberg', contenuInfo: '14kg / personne / an', contenuImg: 'img/meat/rep/poulet.jpg', contenuSrc: 'source info' });

});

  /* GET reponse page -KSEKSE */
  router.get('/ksekse', function (req, res, next) {
    res.render('ksekse');
  });

  router.get('/match', async function (req, res, next) {
    question = await Quiz.find({ type: true }).sort("_id");
    var quizMeatsize = 9;
    if (!req.headers.cookie) {
    res.cookie("countMeat",0,{path: '/match'});
      gamestep=0;
      counter = 0;
      counters = 0;
    } else {
      counters = req.headers.cookie;
      var splitcookies = counters.split(";");
      var gamestepcookie = splitcookies[0].split("=");
      var gamestep = Number(gamestepcookie[1]);
      if(gamestep==quizMeatsize){
        gamestep=0;
      }else{
        gamestep++;
      }
      res.cookie("countMeat",gamestep,{path: '/match' });
    }
    res.render('question', { qNumber: 'Q', reponse1: question[gamestep].repjuste, reponse2: question[gamestep].repfausse1, reponse3: question[gamestep].repfausse2, reponse4: question[gamestep].repfausse3, type: question[gamestep].type, contenu: question[gamestep].questionimg })
  });

  router.get('/question/:id/:number', async (req,res,next)=> {
    let idQuestion = req.params.id
    let numberQuestion = req.params.number

    question = await Quiz.find({ type: idQuestion}).sort("_id");

    res.render('question', { qNumber: 'Q'+numberQuestion, 
    reponse1: question[numberQuestion].repjuste, reponse2: question[numberQuestion].repfausse1, reponse3: question[numberQuestion].repfausse2, 
    reponse4: question[numberQuestion].repfausse3, type: question[numberQuestion].type, contenu: question[numberQuestion].questionimg })
  });

  router.get('/quote', async function (req, res, next) {
    question = await Quiz.find({ type: false }).sort("_id");
    var quizQuotesize = 16;
    if (!req.headers.cookie) {
      res.cookie("countQuote", 0,{path: '/quote' });
      gamestep2=0;
      counter = 0;
      counters2 = 0;
    } else {
      counters2 = req.headers.cookie;
      var split2cookies = counters2.split(";");
      var gamestep2cookie = split2cookies[0].split("=");
      var gamestep2 = Number(gamestep2cookie[1]);
      if(gamestep2==quizQuotesize){
        gamestep2=0;
      }else{
        gamestep2++;
      }
      res.cookie("countQuote",gamestep2,{path: '/quote'});
    }
    res.render('question', { qNumber: 'Q', reponse1: question[gamestep2].repjuste, reponse2: question[gamestep2].repfausse1, reponse3: question[gamestep2].repfausse2, reponse4: question[gamestep2].repfausse3, type: question[gamestep2].type, contenu: question[gamestep2].questiontxt })
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
