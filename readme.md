# QuikDev Junior API
> An API that retrieves people data, deletes, updates and creates people data.

NODE: 
![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&type=6e&v=17.4.0&x2=0)

NPM: ![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&type=6e&v=8.3.1&x2=0)

JEST: ![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&type=6e&v=27.4.6&x2=0)

DOTENV: ![npm version](https://badge.fury.io/js/dotenv.svg)

NODEMON: ![npm version](https://badge.fury.io/js/nodemon.svg)

EXPRESS: ![npm version](https://badge.fury.io/js/Express.svg)

Mongoose Version 6.2.0 

## Installation

Windows:
```
git clone https://github.com/matheus1776/quikdev-backend-challenge.git
```

Linux: 
```
git clone https://github.com/matheus1776/quikdev-backend-challenge.git
```
## Usage example

POST localhost:3000/person
* raw JSON: 
```
{
"id": "8", 
"name": "Pedro",
"username": "Pedrinho",
"birthdate": "14/12/2011",
"address": "Bahia, salvador",
"addressNumber": "6666",
"primaryPhone": "16666-6666",
"description": "Ele é baiano!",
"createdAt": "04-02-22",
"approved": true
}
``` 
* CREATE a one person image exemple: 
![img](https://i.imgur.com/dJDDq6X.png)

* UPDATE a one person image exemple: 
![img](https://i.imgur.com/tFMXhna.png)

* GET a persons image exemple: 
![img](https://i.imgur.com/u4Q3ab2.png)

* GET a one person image exemple:
![img](https://i.imgur.com/GnKYkNE.png)

* DELETE a one person image exemple: 
![img](https://i.imgur.com/ay3nZxB.png)
## Development setup
* Windows or Linux

how to install all development dependencies

```
npm install --save-dev jest

or

yarn add --dev jest

npm install express nodemon mongoose
```

## Release History

* 1.0.0
    * First Version of API


