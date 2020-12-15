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

const sequelize  = new Sequelize(
    process.env.POSTGRES_URL,
    {      
      quoteIdentifiers: false,
      
      operatorsAliases: false,
      
      logging: false,

      //ssl: process.env.SSL_DB,
      dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS
          }
        }
    }
  );


  module.exports = sequelize;