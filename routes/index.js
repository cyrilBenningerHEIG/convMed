var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { gameTitle1: 'Matche ta viande', gameTitle2: 'Devine lauteur'  });
});

/* GET question page. */
router.get('/question', function(req, res, next) {
  res.render('question', { qNumber: 'Q', reponse1: 'Canard', reponse2: 'Poulet', reponse3: 'Boeuf', reponse4: 'Porc' });
});

/* GET reponse page -VRAI */
router.get('/reponseVRAI', function(req, res, next) {
  res.render('reponseVRAI', { vraiVar: 'VRAI'});
});

/* GET reponse page -VRAI */
router.get('/reponseFAUX', function(req, res, next) {
  res.render('reponseFAUX', { fauxVar: 'FAUX'});
});

module.exports = router;
