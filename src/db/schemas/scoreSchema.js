const Sequelize = require('sequelize');
const database = require('../db');
 
const Score = database.define('Score', {
    id: {
        type: Sequelize.INTEGER,
        require: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    pontuacao: {
        type: Sequelize.INTEGER,
        require: true,
        allowNull: false
    },
    perguntas: {
        type: Sequelize.STRING(500),
    }
},{
    options: {
        //opcoes para base existente
        tableName: 'Score',
        freezeTableName: false,
        timestamps: false,
    }
})
 
module.exports = Score;