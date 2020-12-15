const Sequelize = require('sequelize');

// local
// const sequelize  = new Sequelize(
//     'testerquiz', //database
//     'admin', // user
//     'root', //senha
//     {
//       host: 'localhost',
//       dialect: 'postgres',
//       // case sensitive
//       quoteIdentifiers: false,
//       // deprecation warning
//       operatorsAliases: false,
//       //disable logging
//       logging: false
//       // dialectOptions: {
//       //   ssl: true,
//     },
//   );

// 

const sequelize  = new Sequelize(
    'd4oqb6u63s1f2l', //database
    'edydesyhjetqrx', // user
    'acd81ddca3b9de6d573ae33afa66638aebe3550503970434fdea87fecca822a4', //senha
    {
      host: 'ec2-52-201-184-16.compute-1.amazonaws.com:5432',
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