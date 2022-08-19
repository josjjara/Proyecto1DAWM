var DataTypes = require("sequelize").DataTypes;
var _desarrolladores = require("./desarrolladores");
var _videojuegos = require("./videojuegos");

function initModels(sequelize) {
  var desarrolladores = _desarrolladores(sequelize, DataTypes);
  var videojuegos = _videojuegos(sequelize, DataTypes);

  videojuegos.belongsTo(desarrolladores, { as: "idDesarrollador_desarrolladore", foreignKey: "idDesarrollador"});
  desarrolladores.hasMany(videojuegos, { as: "videojuegos", foreignKey: "idDesarrollador"});

  return {
    desarrolladores,
    videojuegos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
