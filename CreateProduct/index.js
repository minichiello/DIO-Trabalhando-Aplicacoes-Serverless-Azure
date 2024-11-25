/*Cria conexão do Mongobd*/
const createMongoClient = require('../shared/mongoClient');

module.exports = async function(context, req) {
    /*Os valores que o 'body' receberá será atribuido na constante 'product'*/
    const product = req.body || {};
    /*Verifica se o valor esta em branco, ou nulo. Caso sim retorna informando que o produto é obrigatorio*/
    if (product) {
        context.res = {
            status: 400,
            body: 'O produto é obrigatório',
        };
    }

    /*Fecha a conexão do Mongobd. Conexão Mongdb é assincrona, então foi utilizado o await*/
    const { client: MongoClient, closeConnectionFn } = await createMongoClient();
    /*Conecta na Collection products do banco de dados*/
    const Products = MongoClient.collection('products');

    try {
        /*Insere o produto na collection products, conforme os valores que estão na constante 'product' */
        const products = await Products.insert(product);
        /*Fecha a conexão do banco de dados*/
        closeConnectionFn();
        /*Retorna o status 201, para constar que os dados foram criados no banco de dados*/
        context.res = { status: 201, body: products.ops[0] };
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Erro ao inserir produto',
        };
    }
};