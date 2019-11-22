const Quiz = require('../models/quiz');
const express = require('express');
const { data } = require('../Seed/new_data');
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

router.get('/reponse/:id/:number/:answer', async function (req, res, next) {
  let id = req.params.id;
  let number = req.params.number;
  let answer = req.params.answer;
  question = await Quiz.find({ type: id}).sort("_id");
  console.log(question);
  let vrai=false;
  if (question[number].repjuste==answer) {
vrai = true  }
  res.render('reponse', { reponse: vrai, contenuTitle: question[number].repjuste, contenuInfo: question[number].info, contenuImg: question[number].repphoto, contenuSrc: question[number].info2});

});
  /* GET reponse page -KSEKSE */
  router.get('/ksekse', function (req, res, next) {
    res.render('ksekse');
  });
 /* router.get('/match', async function (req, res, next) {
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
  });*/

  router.get('/question/:id/:number', async (req,res,next)=> {
    let idQuestion = req.params.id
    let numberQuestion = req.params.number
    
    question = await Quiz.find({ type: idQuestion}).sort("_id");
    let answer = question[numberQuestion].answers;
    answer=shuffle(answer);
    console.log(answer)
    if (idQuestion==1) {
      res.render('question', { qNumber: 'Q'+numberQuestion, 
    reponse1: answer[0], reponse2: answer[1], reponse3: answer[2], 
    reponse4: answer[3], type: question[numberQuestion].type, contenu: question[numberQuestion].questionimg, numberQuestion1: numberQuestion })
    }else{
    res.render('question', { qNumber: 'Q'+numberQuestion, 
    reponse1: answer[0], reponse2: answer[1], reponse3: answer[2], 
    reponse4: answer[3], type: question[numberQuestion].type, contenu: question[numberQuestion].questiontxt, numberQuestion1: numberQuestion })
  }});

  /*router.get('/quote', async function (req, res, next) {
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
  });*/

  router.get('/seed', function (req, res, next) {
    Quiz.remove({}, function (err) {
      console.log('collection removed')
    });
    let seed = data;
    Quiz.create(seed);
    res.send(seed);
  });
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
module.exports = router;
