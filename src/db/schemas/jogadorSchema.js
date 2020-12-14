const Sequelize = require('sequelize');
const database = require('../db');
 
const Jogador = database.define('jogador', {
    id: {
        type: Sequelize.INTEGER,
        require: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(100),
        require: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(50),
        require: true,
        allowNull: false,
        unique: true,
            validate: {
                isEmail: true,
            }
    },
    login: {
        type: Sequelize.STRING(50),
        require: true,
        unique: true,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING(50),
        require: true,
        allowNull: false
    },
    nivel: {
        type: Sequelize.STRING(20),
        require: true,
        allowNull: false
    },
    imagem: {
        type: Sequelize.STRING(50),
    }
},{
    options: {
        //opcoes para base existente
        tableName: 'jogador',
        freezeTableName: false,
        timestamps: false,
    }
})

//const sincronizacao = async function(){ await Jogador.sync()}

module.exports = Jogador;