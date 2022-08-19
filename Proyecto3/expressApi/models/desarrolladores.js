const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('desarrolladores', {
    idDesarrollador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    especialidad: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantEmpleados: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'desarrolladores',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idDesarrollador" },
        ]
      },
    ]
  });
};
