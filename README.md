# CarShop

Projeto de um sistema de cadastro de veículos para comércio online. Sistema é um API REST com CRUD de múltiplos tipos de veículos. Desenvolvido em arquitetura MSC e visando a POO.

### Tecnologias utilizadas

- **TypeScript**
- **Express.js**
- **MongoDB**
- **Mongoose**

### Documentação

Acesse a documentação online com casos de uso [aqui](https://documenter.getpostman.com/view/25780292/2s935snMZ1)

### Para rodar localmente


Clone o projeto para o seu repositório local.
```
git clone git@github.com:vinicius-shk/CarShop.git
```
Acesse a raiz do projeto e rode os comandos para instalar as dependências e subir o Docker

```
cd CarShop && npm i && docker-compose up -d
```

Acesse o container trybesmith e inicie o servico de backend com nodemon

```
docker exec car_shop -it bash && npm run dev
```

Faça as requisições de acordo com a documentação na porta **3001**
