/*Cria conexão do Mongobd*/
const createMongoClient = require('../shared/mongoClient');

/*Função para listar os produtos*/
module.exports = async function(context, req) {
    /*Fecha a conexão do Mongobd. Conexão Mongdb é assincrona, então foi utilizado o await*/
    const { client: MongoClient, closeConnectionFn } = await createMongoClient();
    /*Conecta na Collection products do banco de dados*/
    const Products = MongoClient.collection('products');

    /*Buscará todos os produtos da lista (find), sem filtro*/
    const res = await Products.find({});
    /*Converte a lista em array*/
    const body = await res.toArray();

    /*Fecha a conexão do banco de dados*/
    closeConnectionFn();

    /*Retorna a lista de produtos*/
    context.res = {
        status: 200,
        body,
    };
};