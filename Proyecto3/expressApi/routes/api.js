var express = require('express');
var router = express.Router();

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
const videojuegos = require('../models').videojuegos;
var models = initModels(sequelize);  



router.get('/', function(req, res, next) {
  res.render('api', { title: 'Api' });
});

router.get('/videojuegos', function(req, res, next) {  
  	
  videojuegos.findAll({  
    attributes: { exclude: ["updatedAt"] }  
  })  
 .then(videojuegos => {
    res.json(videojuegos)
 })
 .catch(error => res.status(400).send(error))

});


module.exports = router;