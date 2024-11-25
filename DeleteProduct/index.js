/* { ObjectID } irá converter a string que esta no { id } para um ObjetoID, isso é para que o
mongobd entenda o valor que esta recebendo*/
const { ObjectID } = require('mongodb');

/*Cria conexão do Mongobd*/
const createMongoClient = require('../shared/mongoClient');

module.exports = async function(context, req) {
    /*Recupera o valor do id do produto, para pesquisa*/
    const { id } = req.params;
    /*Valida se o conteudo esta em branco*/
    if (!id) {
        context.res = {
            status: 400,
            body: 'Informe o ID do produto',
        };
        return;
    }

    /*Fecha a conexão do Mongobd. Conexão Mongdb é assincrona, então foi utilizado o await*/
    const { client: MongoClient, closeConnectionFn } = await createMongoClient();

    /*Conecta na Collection products do banco de dados*/
    const Products = MongoClient.collection('products');

    /*Deleta o produto na collection products, conforme os valores que estão na constante 'product'
      e com base no 'id' do produto que foi informado */
    /*Retorna o status 202, para constar que ação foi aceita no banco de dados*/

    try {
        await Products.findOneAndDelete({ _id: ObjectID(id) });
        closeConnectionFn();
        context.res = {
            status: 202,
            body: 'Produto deletado com sucesso!',
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Erro ao deletar o produto' + id,
        };
    }

};