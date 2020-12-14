const Sequelize = require('sequelize');

const sequelize  = new Sequelize(
    'testerquiz', //database
    'admin', // user
    'root', //senha
    {
      host: 'localhost',
      dialect: 'postgres',
      // case sensitive
      quoteIdentifiers: false,
      // deprecation warning
      operatorsAliases: false,
      //disable logging
      logging: false
      // dialectOptions: {
      //   ssl: true,
    },
  );

  module.exports = sequelize;