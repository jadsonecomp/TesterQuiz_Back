const { strictEqual, deepStrictEqual, ok } = require('assert');
const database = require('../src/db/db');
const jogadorSchema = require('../src/db/schemas/jogadorSchema');
const scoreSchema = require('../src/db/schemas/scoreSchema');

const MOCK_JOGADOR_DEFAULT = { nome: 'OriginOne', email: 'teste@teste.com', 
                                login: 'Ori', senha: 'ori@teste', 
                                nivel: 'INICIANTE'};

const MOCK_SCORE_DEFAULT = { pontuacao: 10, perguntas: '1|2'};



describe('Testando ScoreSchema no CRUD de Score', function() {
  this.timeout(Infinity);
  before(async () => {

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

  });

  it('PostgresSQL connection', async () => {
    
    let result = ''
    try {

      result = await database.authenticate();   
      result = true; 

    } catch (error) {

      result = false;   

    }
    
    strictEqual(result, true);

  });

  it.only('cadastrar', async () => {
    
    const jogadorItem = await jogadorSchema.create(MOCK_JOGADOR_DEFAULT);
    
    const novoItem = {
        ...MOCK_SCORE_DEFAULT,
        id_jogador: jogadorItem.dataValues.id   
    }

    console.log('novoItem: ', novoItem);

    const result = await scoreSchema.create(novoItem);

    const jogadorBusca= await jogadorSchema.findByPk(jogadorItem.dataValues.id, {include: scoreSchema})
    const scoreBusca = await jogadorBusca.getScore();

    console.log('jogadorBusca: ', jogadorBusca);
    console.log('scoreBusca: ', scoreBusca);

    delete result.dataValues.id;
    delete result.dataValues.createdAt;
    delete result.dataValues.createdat;
    delete result.dataValues.updatedAt;
    delete result.dataValues.updatedat;



    deepStrictEqual(result.dataValues, novoItem);
  });

  
});                                