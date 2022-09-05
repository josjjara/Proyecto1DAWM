var express = require('express');
var router = express.Router();

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
const users = require('../models').users;
var models = initModels(sequelize);  

const loggedMiddleware = (req,res,next) => {

    if(req.session.logged){
        res.send(req.body.username);
    }
    else{
        next()
    }

}

router.post('/', loggedMiddleware, function(req, res, next) {
  
  users.findOne({ 
    where: {
      [Op.and]: [
        { username: req.body.username },
        { password: req.body.password }
      ]
     } , 
    attributes: { exclude: ["password","createdAt","updatedAt"] }  
  })  
 .then(user => {
    req.session.logged = true;
    res.send(user.username);
 })

 .catch(error => res.status(400).send(error))

});

router.post('/logout', function(req,res,next){
    req.session.destroy();
});



module.exports = router;