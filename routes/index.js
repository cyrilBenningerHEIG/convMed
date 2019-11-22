const Quiz = require('../models/quiz');
const express = require('express');
const { data } = require('../Seed/new_data');
const router = express.Router();
var cookie = require('cookie');
var cookieParser = require('cookie-parser');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.cookie("Score", 0);
  res.render('index', { gameTitle1: 'Matche ta viande', gameTitle2: 'C\'est Kikadissa?' });
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
  question = await Quiz.find({ type: id }).sort("_id");
  let vrai = false;
  if (question[number].repjuste == answer) {
    if (!req.headers.cookie) {
      res.cookie("Score", 0);
      userScore = 0;
    } else {
      cookies = req.headers.cookie;
      var splitcookies = cookies.split(";");
      var sliptedcookies = splitcookies[0].split("=");
      var userScore = Number(sliptedcookies[1]);
    }
    userScore++;
    res.cookie("Score", userScore);
    vrai = true
  }
  res.render('reponse', { reponse: vrai, contenuTitle: question[number].repjuste, contenuInfo: question[number].info, contenuImg: question[number].repphoto, contenuSrc: question[number].info2, type: id, numberQuestion: number });

});
/* GET reponse page -KSEKSE */
router.get('/ksekse', function (req, res, next) {
  res.render('ksekse');
});


router.get('/question/:id/:number', async (req, res, next) => {
  let idQuestion = req.params.id
  let numberQuestion = req.params.number
  question = await Quiz.find({ type: idQuestion }).sort("_id");
  if (numberQuestion == question.length) {
    cookies = req.headers.cookie;
    var splitcookies = cookies.split(";");
    var sliptedcookies = splitcookies[0].split("=");
    var userScore = Number(sliptedcookies[1]);
    res.render('fin', { Score: userScore, Total: question.length });
  }
  let answer = question[numberQuestion].answers;
  answer = shuffle(answer);
  if (idQuestion == 1) {
    res.render('question', {
      qNumber: 'Q' + numberQuestion,
      reponse1: answer[0], reponse2: answer[1], reponse3: answer[2],
      reponse4: answer[3], type: question[numberQuestion].type, contenu: question[numberQuestion].questionimg, numberQuestion1: numberQuestion
    })
  } else {
    res.render('question', {
      qNumber: 'Q' + numberQuestion,
      reponse1: answer[0], reponse2: answer[1], reponse3: answer[2],
      reponse4: answer[3], type: question[numberQuestion].type, contenu: question[numberQuestion].questiontxt, numberQuestion1: numberQuestion
    })
  }
});



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
