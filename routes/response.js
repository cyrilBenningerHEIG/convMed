var express = require('express');
var router = express.Router();
const Response = require('../models/response');
const Question = require('../models/question');
const ObjectId = mongoose.Types.ObjectId;


var responseQuiz = [
    {
    _id : "Q1",
    nom : "Q1", 
    photo_response : "https://static.lexpress.fr/medias_12024/w_2048,h_1146,c_crop,x_0,y_17/w_480,h_270,c_fill,g_north/v1563812176/l-adolescente-suedoise-greta-thunberg-manifeste-pour-le-climat-a-hambourg-le-1er-mars-2019_6156620.jpg",
    text_question : "Vous ne parlez que d'aller de l'avant avec les mêmes mauvaises idées qui nous ont mis dans ce pétrin, même si la seule chose raisonnable à faire est de tirer le frein à main.", 
    info : "C'est une citation tirée du discours percutant de Greta Thunberg qui fait face aux plus grands hommes politiques lors d'un sommet de l'ONU, où elle dénonce les inactions des dirigeants. " 
    },
    {
    _id : "Q2",
    nom : "Q2", 
    photo_response : "https://mcetv.fr/wp-content/uploads/2019/11/Sans-titre-2.jpg",
    text_question : "L'européen oublie trop souvent qu'il n'est rien face à la nature qui reprend ses droits",
    info : "C'est un titre du rappeur français Nekfeu, 'Premier pas', tiré de son dernière album Les Étoiles Vagabondes. Comme quoi, malgré leur réputation, les rappeurs peuvent être touchés par des causes primordiales comme l'écologie."
    },
    {
    _id : "Q3",
    nom : "Q3", 
    photo_response : "https://drive.google.com/open?id=1jU2_pNKuH3I9POql2ks4AeMlzDDKsJvm",
    text_question : "L'européen oublie trop souvent qu'il n'est rien face à la nature qui reprend ses droits",
    info : "C'est Coluche ! A son époque, il était déjà conscient de l'enjeu de l'écologie.",
    },
    
]
var responsePhoto = [
    
]

new Response(responseQuiz[0]).save();



module.exports = router;
