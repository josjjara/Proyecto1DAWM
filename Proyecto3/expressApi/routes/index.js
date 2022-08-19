var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});






// router.get("/productosc", function(req , res, next){

// 	let cantidadmenor = parseInt(req.query.cantidadmenor);
// 	let cantidadmayor = parseInt(req.query.cantidadmayor);

//   Producto.findAll({
//     where: { 
//       cantidad: { 
//           [Op.between]: [cantidadmenor, cantidadmayor]
//       }
//     }
//   })
//   .then(productos => {  
//       res.json( productos );  
//   })  
//   .catch(error => res.status(400).send(error))

// })

module.exports = router;
