const { join } = require('path')
const { config } = require('dotenv')

const configPath = join('./config', `.env.prod`)

console.log('configPath: ', configPath)

config({
    path: configPath
})


const Hapi = require('hapi')
const Joi = require('joi')
const database = require('./src/db/db');
const jogadorSchema = require('./src/db/schemas/jogadorSchema');
const perguntaSchema = require('./src/db/schemas/perguntaSchema');
const scoreSchema = require('./src/db/schemas/scoreSchema');

const fetch = require('node-fetch');



const QUESTOES = require('./bancoQuestoes');
const URL_QUESTOES = 'https://testerquizback.herokuapp.com/perguntas';
function setScore(){
    try {    
        return fetch(URL_QUESTOES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(QUESTOES)
        }).then(response => {
            return response.json();
            })  
        .then(json => {
                return json;  
            })    
        .catch(err => console.log('Request Failed', err)); 
    } catch (error) {
        console.log(error); 
    }
}






async function main() {

    // const app = Hapi.Server({
    //     host: process.env.HOST || 'localhost',
    //     port: process.env.PORT || 3000,
    //     routes: { cors: true }
    // });

    const app = Hapi.Server({
        // host: process.env.HOST,
        // port: process.env.PORT,
        routes: { cors: true },
        port: process.env.PORT
        
    });

    try {     

        jogadorSchema.hasOne(scoreSchema, {
            foreignKey: {
                name: 'id_jogador',
                allowNull: false},
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
        scoreSchema.belongsTo(jogadorSchema, {
            foreignKey: {
                name: 'id_jogador',
                allowNull: false},
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })  

        const resultado = await database.sync({force: true});
    } catch (error) {
        console.log(error);
    }  


    app.route(
        [
            
            {
                method: 'POST',
                path: '/score',
                handler: async (request, h) => {
                    const payload = request.payload;
                    try {
                        const scoreCad = await scoreSchema.create(payload);
                        return scoreCad;    
                    } catch (error) {
                        return error;    
                    }
                    
                }
            },
            {
                method: 'GET',
                path: '/score',
                handler: async (request, h) => {

                    const {id_jogador} = request.query

                    if (!isNaN(id_jogador)) {
                        return await scoreSchema.findAll({
                            where: {
                                id_jogador: id_jogador
                            },
                            order: [
                                ['pontuacao', 'DESC']
                            ],
                            raw: true
                        });    
                    }else{
                        return await scoreSchema.findAll({
                            order: [
                                ['pontuacao', 'DESC']
                            ],
                            raw: true
                        });
                    }

                    

                }
            },
            {
                method: 'GET',
                path: '/pergunta',
                handler: async (request, h) => {

                    return await perguntaSchema.findAll({
                        // where: item,
                        raw: true
                    });
                }
            },
            {
                method: 'POST',
                path: '/pergunta',
                handler: async (request, h) => {
                    const payload = request.payload;
                    try {
                        const perguntaCad = await perguntaSchema.create(payload);
                        return perguntaCad;    
                    } catch (error) {
                        return error;    
                    }
                    
                }
            },
            {
                method: 'POST',
                path: '/perguntas',
                handler: async (request, h) => {
                    const payload = request.payload;
                    try {
                        const perguntaCad = await perguntaSchema.bulkCreate(payload);
                        return perguntaCad;    
                    } catch (error) {
                        return error;    
                    }
                    
                }
            },
            {
                method: 'GET',
                path: '/jogador',
                handler: async (request, h) => {

                    const {id} = request.query
                    console.log('Cheguei aqui: ', request)
                    console.log('process.env.HOST: ', process.env.HOST)
                    
                    if (!isNaN(id)) {
                        return await jogadorSchema.findAll({
                            where: {
                                id: id
                            },
                            order: [
                                ['id', 'ASC']
                            ],
                            raw: true
                        });    
                    }else{
                        return await jogadorSchema.findAll({
                            //include: scoreSchema,
                            order: [
                                ['id', 'ASC']
                            ],
                            raw: true
                        });
                    }
                }
            },
            {
                method: 'POST',
                path: '/jogador',
                config: {

                    // validate: {
                    //     failAction: (request, h, err) => {
                    //         throw err;
                    //       },
                    //     payload: {
                    //         nome: Joi.string().max(100).required(),
                    //         email: Joi.string().max(50).required(),
                    //         login: Joi.string().max(50).required(),
                    //         senha: Joi.string().max(50).required(),
                    //         nivel: Joi.string().max(20),
                    //         imagem: Joi.string().max(50)

                    //     }
                    // },

                },
                handler: async (request, h) => {
                    const payload = request.payload;
                    try {
                        const jogadorCad = await jogadorSchema.create(payload);
                        return jogadorCad;    
                    } catch (error) {
                        return error;    
                    }
                    
                }
            },
            {
                method: 'POST',
                path: '/login',
                config: {

                    // validate: {
                    //     failAction: (request, h, err) => {
                    //         throw err;
                    //       },
                    //     payload: {
                    //         // nome: Joi.string().max(100).required(),
                    //         // email: Joi.string().max(50).required(),
                    //         // login: Joi.string().max(50).required(),
                    //         // senha: Joi.string().max(50).required(),
                    //         // nivel: Joi.string().max(20),
                    //         // imagem: Joi.string().max(50)

                    //     }
                    // },

                },
                handler: async (request, h) => {
                    const payload = request.payload
                    const jogadorLogin = await jogadorSchema.findAll({
                        where: payload,
                        raw: true
                    });
                    return jogadorLogin;
                }
            }
        ]
    )

    await app.start()
    console.log('server running at', app.info.port)

    setTimeout(async () => {
       const perguntasReturn = await setScore()    
    }, 10000);

}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

main()