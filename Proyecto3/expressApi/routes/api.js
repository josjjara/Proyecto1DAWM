var express = require('express');
var router = express.Router();


const sequelize = require('../models/index.js')

const videojuegos = require('../models').videojuegos;
const desarrolladores = require('../models').desarrolladores;

router.get('/', function(req, res, next) {
  res.render('api', { title: 'Api' });
});

router.get('/videojuegos', function(req, res, next) {  
  	
  videojuegos.findAll()  
 .then(videojuegos => {
    res.json(videojuegos)
 })
 .catch(error => res.status(400).send(error))

});

router.get('/desarrolladores', function(req, res, next) {
  
  desarrolladores.findAll()  
  .then(desarrolladores => {
    res.json(desarrolladores)
  })
  .catch(error => res.status(400).send(error))

});


module.exports = router;