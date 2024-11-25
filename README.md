## Projeto: Construção de APIs usando arquitetura ServerLess (Azure) com o recurso Azure functions e conexão com Mongobd.

+ O intuito do projeto é criar uma API de produtos, onde será feito o deploy da API no servidor Cloud Azure da Microsoft utilizando o conceito de Serverless Computing. Sera utilizado o recurso Azure functions que terá conexão com banco de dados Mongobd(NoSQL).

+ O Termo Serverless Computing é utilizado para representar o conceito de Cloud Computing, que significa 'Computação sem servidor'. O Serverless é orientado a eventos e se diferencia das outras abordagens de servidores físicos, virtuais e contêineres por sua infraestrutura.

+ No projeto foi aplicado conceitos:
    - Criação de estrutura de pastas padrão Azure.
    - Criação de Conexão com banco de dados Mongodb(NoSQL).
    - Criação de Rotas seguindo padrões Rest.
    - Criação de functions utilizando o Azure Functions.
    - Deploy da API no servidor da Azure.
 
 + O projeto publicado é referente ao treinamento do Curso BootCamp Desenvolvedor NodeJS da Digital Innovation One.
   
   [https://digitalinnovation.one](https://digitalinnovation.one)

## Funções criadas:

##### PESQUISA LISTA DE PRODUTOS 

```
Nome da Função: GetProducts
Metodo: [GET]
Rota: http://localhost:7071/api/products
```

##### PESQUISA DO PRODUTO PELO ID 

```
Nome da Função: GetProductByID 
Metodo: [GET]
Rota: http://localhost:7071/api/products/{id}
```

##### CRIAR PRODUTO
```
Nome da Função: CreatProduct
Metodo: [POST]
Rota: http://localhost:7071/api/products
```

##### ATUALIZAR PRODUTO
```
Nome da Função: UpdateProduct
Metodo: [PUT]
Rota: http://localhost:7071/api/products/{id}
```

##### DELETAR PRODUTO
```
Nome da Função: DeleteProduct
Metodo: [DELETE] 
Rota: http://localhost:7071/api/products/{id}
```

## Ferramentas Utilizadas 

##### AZURE FUNCTIONS + AZURE FUNCTIONS CORE TOOLS: 

- Azure Functions
    Necessario ter uma conta na microsoft para poder utilizar os recursos.
    
    Para utilizar os recursos, tem a opção paga, tem a opção que recebe creditos (sem custo) apenas para experimentar alguns recursos e tem a opção estudante (paga e gratuita). 
    
    Detalhe: Para estudantes de Instituição de Ensino de Faculdade ou Universidade, poderá criar a conta no Azure para Estudante (Azure for Students). Essa conta dará o benefício em possuir crédito de USD 100,00 para usar os serviços de maneira gratuita, sem necessidade de possuir um cartão de crédito. Para mais informações acesse o link abaixo: 

    [https://azure.microsoft.com/pt-br/free/students/](https://azure.microsoft.com/pt-br/free/students/)

- Azure Functions Core Tools 
    É uma ferramenta de linha de comando da Azure, que possibilita rodar, criar, testar as funções localmente.
    Utilizei a IDE Vscode, e instalei a extensão do Azure Functions no Vscode.
    O link abaixo, mostra como instalar o Azure Functions, Azure Functions Core Tools, Criar estrutura de Pasta no vscode padrão do Azure.
    
    [https://docs.microsoft.com/pt-br/azure/azure-functions/functions-develop-vs-code?tabs=csharp](https://docs.microsoft.com/pt-br/azure/azure-functions/functions-develop-vs-code?tabs=csharp)


##### MONGODB

- MongoDB é um software de banco de dados orientado a documentos livre. Classificado como um programa de banco de dados NoSQL, o MongoDB usa documentos semelhantes a JSON com esquemas. Abaixo o comando para instalar o mongodb no projeto:

    `$npm i mongodb`

##### INSOMNIA

- Utilizado o Insomnia para testar conexoes de requisições em geral. Se preferir, utilize outro programa de preferencia (como por exemplo o PostMan, SoapUI, Katalon Studio, Rest-Assured....). Abaixo o link para instalar o Insomnia:

    [https://insomnia.rest/download/](https://insomnia.rest/download/)

##### TESTAR CONEXÃO

- Assim que criar a estrutura de pastas padrão do Azure, no arquivo index.js, apague o conteudo que tiver, e informe o codigo abaixo. 

```javascript
module.exports = async function(context, req) {
    context.res = {
        status: 200,
        body: 'Hello World'
    };
};
```

- Dentro do vscode, no terminal, digite o comando abaixo para testar a conexão.

    `$func host start`

- Será iniciado todas as 'functions' do projeto, e será mostrado a execução na linha de comando, e quase no final da linha de comando, será apresentado o link com o numero da porta onde será executado o projeto localmente. No meu caso apresentou o link abaixo, se abrir o link no navegador ou no Insomnia, aparecerá a mensagem 'Hello Word'.

```
Functions:
        GetProducts: [GET,POST] http://localhost:7071/api/GetProducts
```

##### ROTA PESQUISA DE LISTA DE PRODUTOS (GET)

- Para criar a rota para listar os produtos, no arquivo 'function.json', informe o comando abaixo, no objeto 'bindings'. Nesse trecho o que muda é o 'methods' que será mantido apenas o 'get', e será adicionado o 'route' com valor de '"route": "products"'.

```javascript
 "bindings": [{
            "authLevel": "anonymous",
            "type": "httpTrigger",
            "direction": "in",
            "name": "req",
            "methods": ["get"],
            "route": "products"

        },
```

- Ao parar e iniciar novamente as 'functions' com o comando abaixo, repare que a rota mudou. Abaixo o comando para executar as 'functions'. Detalhe: Para parar, execute Ctrl + C

    `$func host start`

- Rota criada, apenas com o metodo 'get', para lista de produtos

```
Functions:
        GetProducts: [GET] http://localhost:7071/api/products
```

##### ROTA PESQUISA DO PRODUTO PELO ID (GET)

- Para criar uma nova rota tem que criar uma nova função, nesse caso execute o comando abaixo:

```
Digite o comando: func new
Digite a opção 8 (8. HTTP Tringger)
Informe o nome da função: GetProducts
```

- Para criar a rota para pesquisar o produto pelo id, no arquivo 'function.json', informe o comando abaixo, no objeto 'bindings'.
Nesse trecho o que muda é o 'methods' que será mantido apenas o 'get', e será adicionado o 'route' com valor de 'products/{ id }'.

```
"bindings": [{
            "authLevel": "anonymous",
            "type": "httpTrigger",
            "direction": "in",
            "name": "req",
            "methods": ["get"],
            "route": "products/{ id }"

        },
```

- Para esse caso, abaixo a rota criada, para o metodo 'get'. Detalhe: tem que parar o serviço do azure e iniciar novamente com o comando abaixo, para que o azure reconheça a nova functions criada. Para parar o serviço utilize o Ctrl + C

    `$func host start`

- Rota criada, apenas com o metodo 'get'.

```
Functions:
        GetProducts: [GET] http://localhost:7071/api/products{id}
```

##### IMPLANTAR A API NO AZURE
- Apos concluir o desenvolvimento, e ter criado uma conta no site da Microsof. Dentro do vscode é possivel fazer o deploy da API no azure.
Segue abaixo o link dos passos para realizar esse procedimento. No final será criado um link da sua API que poderá ser acessado no navegador.

    [https://docs.microsoft.com/pt-br/azure/azure-functions/create-first-function-vs-code-node#publish-the-project-to-azure](https://docs.microsoft.com/pt-br/azure/azure-functions/create-first-function-vs-code-node#publish-the-project-to-azure)
    
