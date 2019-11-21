const Quiz = require('../models/quiz');
const express = require('express');
const { data } = require('../Seed/data');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { gameTitle1: 'Matche ta viande', gameTitle2: 'Devine l\'auteur'  });
});

/* GET question page. */
router.get('/question', function(req, res, next) {
  res.render('question', { qNumber: 'Q', reponse1: 'Canard', reponse2: 'Poulet', reponse3: 'Boeuf', reponse4: 'Porc' });
});

/* GET reponse page */
router.get('/reponse', function(req, res, next) {
  res.render('reponse', { reponseFaux: true});
});


/* GET reponse page -VRAI */
router.get('/reponseFAUX', function(req, res, next) {
  res.render('reponseFAUX', { fauxVar: 'FAUX'});
});
router.get('/match', async function (req, res, next) {
    question = await Quiz.find({type:true}).sort("_id");
    res.render('question',{ qNumber: 'Q', reponse1: question[0].repjuste, reponse2: question[0].repfausse1, reponse3: question[0].repfausse2, reponse4: question[0].repfausse3 ,type:question.type})
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

async function GetData(typeQuiz){
  let question = await Quiz.find({type:typeQuiz});
  
  return question;
} 


module.exports = router;
