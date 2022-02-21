const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  return user;
};

module.exports = User;

/* Referência para criação do model com mais de um atributo:
https://medium.com/@rogeriothe_48115/relacionamentos-com-sequelize-guia-final-2b3baf21b2a1 */