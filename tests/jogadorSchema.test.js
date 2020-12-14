const { strictEqual, deepStrictEqual, ok } = require('assert');
const database = require('../src/db/db');
const jogadorSchema = require('../src/db/schemas/jogadorSchema');

const MOCK_JOGADOR_DEFAULT = { nome: 'OriginOne', email: 'teste@teste.com', 
                                login: 'Ori', senha: 'ori@teste', 
                                nivel: 'INICIANTE'};



describe('Testando jogadorSchema no CRUD de Jogador', function() {
  this.timeout(Infinity);
  before(async () => {

    try {      
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

  it('cadastrar', async () => {
    
    const result = await jogadorSchema.create(MOCK_JOGADOR_DEFAULT);
    

    delete result.dataValues.id;
    delete result.dataValues.imagem;
    delete result.dataValues.createdAt;
    delete result.dataValues.createdat;
    delete result.dataValues.updatedAt;
    delete result.dataValues.updatedat;



    deepStrictEqual(result.dataValues, MOCK_JOGADOR_DEFAULT);
  });

  
});                                