# Dictionary

Este é um projeto de uma API para um dicionário online.

## Visão Geral

A API fornece endpoints para autenticação de usuários, manipulação de entradas no dicionário, gerenciamento de favoritos e histórico de usuário.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express.js
- TypeORM
- JWT (JSON Web Tokens)
- MySQL
- Docker

## Instalação e Uso com Docker

1. Clone este repositório:
   ```sh
   git clone https://github.com/rafaellaranjo/dictionary.git

2. Instale as dependências:
   ```sh
   cd dictionary
   npm install

3. Renomeie o arquivo .env.example para .env e configure suas variáveis de ambiente, como as credenciais do banco de dados e a chave secreta JWT.
4. Execute o aplicativo com Docker Compose:
   ```sh
   docker-compose up
5. O aplicativo estará disponível em http://localhost:3333.

## Endpoints

Pode acessar a documentação em http://localhost:3333/api-docs/#/

- **GET /auth/signup**: Registrar um novo usuário.
- **POST /auth/signin**: Autenticar usuário.
- **GET /entries/en**: Listar palavras do dicionário.
- **GET /entries/en/:word**: Obter informações de uma palavra do dicionário.
- **POST /entries/en/:word/favorite**: Salvar palavra como favorita.
- **DELETE /entries/en/:word/unfavorite**: Remover palavra das favoritas.
- **GET /user/me**: Obter perfil do usuário.
- **GET /user/me/history**: Obter histórico de palavras visitadas.
- **GET /user/me/favorites**: Obter lista de palavras favoritas do usuário.

