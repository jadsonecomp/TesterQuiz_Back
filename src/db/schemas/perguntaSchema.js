const Sequelize = require('sequelize');
const database = require('../db');
 
const Pergunta = database.define('Pergunta', {
    id: {
        type: Sequelize.INTEGER,
        require: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    question: {
        type: Sequelize.STRING(900),
        require: true,
        allowNull: false
    },
    choice1: {
        type: Sequelize.STRING(900),
        require: true,
        allowNull: false
    },
    choice2: {
        type: Sequelize.STRING(900),
        require: true,
        allowNull: false
    },
    choice3: {
        type: Sequelize.STRING(900),
        require: true,
        allowNull: false
    },
    choice4: {
        type: Sequelize.STRING(900),
        require: true,
        allowNull: false
    },
    answer: {
        type: Sequelize.INTEGER,
        require: true,
        allowNull: false
    }
},{
    options: {
        //opcoes para base existente
        tableName: 'Pergunta',
        freezeTableName: false,
        timestamps: false,
    }
})
 
module.exports = Pergunta;