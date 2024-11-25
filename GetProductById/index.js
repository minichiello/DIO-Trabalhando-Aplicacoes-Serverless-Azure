/* { ObjectID } irá converter a string que esta no { id } para um ObjetoID, isso é para que o
mongobd entenda o valor que esta recebendo*/
const { ObjectID } = require('mongodb');

/*Cria conexão do Mongobd*/
const createMongoClient = require('../shared/mongoClient');

/*Função para pesquisar o produto pelo id*/
module.exports = async function(context, req) {
    /*Recupera o valor do id do produto, para pesquisa*/
    const { id } = req.params;

    /*Fecha a conexão do Mongobd. Conexão Mongdb é assincrona, então foi utilizado o await*/
    const { client: MongoClient, closeConnectionFn } = await createMongoClient();
    /*Conecta na Collection products do banco de dados*/
    const Products = MongoClient.collection('products');

    /*Buscará apenas um produto da lista (findOne), conforme o que consta no 'id'*/
    const res = await Products.findOne({ _id: ObjectID(id) });

    /*Fecha a conexão do banco de dados*/
    closeConnectionFn();

    /*Retorna apenas o produto encontrado*/
    context.res = {
        status: 200,
        body: res,
    };
};