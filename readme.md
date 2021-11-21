# QuikDev Backend Challenge 


## Descrição

O desafio persiste na criação de uma API RESTful que possa criar/listar/deletar/atualizar os dados dos usuários a partir de um banco de dados.

## Pré requisitos

Para rodar o projeto, você precisará de algumas dependências previamente instaladas:

- [NodeJS](https://nodejs.org/en/) ( Versão recomendada: 14.18.1)
- [Yarn](https://yarnpkg.com/) ou NPM

## Clonando o repositório 

Para baixar o repositório localmente, basta utilizar o seguinte comando em seu terminal de preferência:

```bash
$ git clone https://github.com/marceloWired/quikdev-backend-challenge.git
```

## Instalando dependências

<p>Após clonar o repositório, você precisará instalar as dependências do projeto.</p>

<p>Para isso, basta navegar até a pasta do projeto e rodar o seguinte comando:</p>

```bash

# navegando até a pasta
$ cd ./backend-nimbus-meteorologia

# mudando para a branch correta
$ git checkout marcelo-santos

# instalando dependências: para Yarn
$ yarn

# instalando dependências: para NPM
$ npm install
```

## Rodando o projeto

<p>Uma vez que instalada todas as dependências, você já pode rodar a aplicação! Basta utilizar o comando:</p>

```bash
# para Yarn
$ yarn start

# para NPM
$ npm start
```

Por padrão, a aplicação irá rodar na porta 5050.

## Testes

<p>Os testes utilizam o MongoDb In Memory para serem realizados, assim não impactando no banco de produção.</p>

<p>Para executar os testes, basta rodar o seguinte comando em seu terminal:</p>

```bash
# pra Yarn
$ yarn test

# para NPM
$ npm run test
```


## Rota de cadastro

<p>Para cadastrar novos usuários, a API espera uma chamada do tipo <strong>POST</strong> na rota <i>http://localhost:5050/api/user</i> contendo no corpo da requisição um objeto JSON com o seguinte modelo:</p>

```bash
{
  "name": string,
  "username": string
  "birthdate": string,
  "address": string,
  "addressNumber": string,
  "primaryPhone": string,
  "description": string
}
```

## Rota de listagem

<p>Para listar todos os usuários cadastrados, basta fazer uma chamada do tipo <strong>GET</strong> para o endereço:</p>

```bash
http://localhost:5050/api/user/
```

<p>E para listar um único usuário, basta adicionar seu ID como parâmetro:</p>

```bash
http://localhost:5050/api/user/:id
```

## Rota de exclusão

<p>Para excluir um usuário, basta fazer uma chamada do tipo <strong>DELETE</strong> informando o ID do usuário que deseja deletar por parâmetro:</p>

```bash
http://localhost:5050/api/user/:id
```

## Rota de atualização

<p>Para atualizar os dados de um usuário, basta fazer uma chamada do tipo <strong>PUT</strong> informando os dados do usuário no corpo da requisição para a rota
http://localhost:5050/api/user/ 

<p>O corpo da requisição deve seguir o seguinte modelo:</p>

```bash
{
  "id": string,
  "createdAt": string,
  "name": string,
  "username": string
  "birthdate": string,
  "address": string,
  "addressNumber": string,
  "primaryPhone": string,
  "description": string
}
```
