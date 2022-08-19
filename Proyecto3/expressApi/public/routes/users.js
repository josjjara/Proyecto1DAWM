var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/jose', function(req, res, next) {
  res.send('Respuesta para jose');
});

module.exports = router;
