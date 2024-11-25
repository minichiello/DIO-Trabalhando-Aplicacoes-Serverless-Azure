/* { ObjectID } irá converter a string que esta no { id } para um ObjetoID*/
const { ObjectID } = require('mongodb');

/*Cria conexão do Mongobd*/
const createMongoClient = require('../shared/mongoClient');

module.exports = async function(context, req) {

    /*Recupera o valor do id do produto, para pesquisa*/
    const { id } = req.params;

    /*Os valores que o 'body' receber será atribuido na constante 'product'*/
    const product = req.body;

    /*Fecha a conexão do Mongobd. Conexão Mongdb é assincrona, então foi utilizado o await*/
    const { client: MongoClient, closeConnectionFn } = await createMongoClient();

    /*Conecta na Collection products do banco de dados*/
    const Products = MongoClient.collection('products');

    /*Atualiza o produto na collection products, conforme os valores que estão na constante 'product'
    e com base no 'id' do produto que foi informado */
    const res = await Products.findOneAndUpdate({ _id: ObjectID(id) }, { $set: product });

    /*Fecha a conexão do banco de dados*/
    closeConnectionFn();

    /*Retorna o status 202, para constar que ação foi aceita no banco de dados*/
    context.res = {
        status: 202,
        body: res
    };


};