var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Api Methods' });
});

router.get('/json', function(req, res, next) {
  
  apiMethods = [
    {url:"/json","Render json de los metodos del api"},
    {url: "/api/videojuegos", uso: "Obtiene todos los videjuegos en la base de datos relacional"},
    {url: "/api/desarrolladores", uso: "Obtiene todos los desarrolladores en la base de datos relacional"},
    {url: "/login", uso: "Revisa la base de datos para la clave y usuario enviada"},
    {url: "/login/logout", uso: "Destruye la sesión para hacer un logout"},
  ]

  res.json(apiMethods);
});


module.exports = router;
