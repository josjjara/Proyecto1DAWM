const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('videojuegos', {
    idJuego: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idDesarrollador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'desarrolladores',
        key: 'idDesarrollador'
      }
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    fechaLanzamiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    sales: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'videojuegos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idJuego" },
        ]
      },
      {
        name: "idDesarrollador",
        using: "BTREE",
        fields: [
          { name: "idDesarrollador" },
        ]
      },
    ]
  });
};
