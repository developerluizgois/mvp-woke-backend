# MVP Woke Back End

Seja bem-vindo ao repositório do back-end MVP do desafio Woke. Aqui você encontrará a estrutura de código da API feita em Node.js dockerizado com TypeScript e MongoDB como banco de dados.

# Sobre a Arquitetura

A escolha da Arquitetura baseada em orientação a objetos e uma estrutura organizada de pastas como a que você verá abaixo foi pensada para escalar e diminuir o tempo de desenvolviemnto de novas funcionalidades. Isso é importante para a manutenção a longo prazo do projeto, especialmente em equipes grandes ou em projetos complexos.

## Separação de responsabilidades:

* **Controllers**: Responsáveis por lidar com a lógica de requisições e respostas HTTP.
* **Database**: Contém lógica relacionada ao banco de dados, como conexões e operações.
* **Helpers e Utils**: Funções auxiliares e utilitárias que podem ser reutilizadas em todo o projeto.
* **Interfaces**: Define os tipos de dados usados no projeto, promovendo tipagem segura em TypeScript.
* **Middlewares**: Funções intermediárias que podem processar ou modificar requisições antes de chegarem aos controllers.
* **Models e Schemas**: Representam os dados e estruturas usadas no banco de dados, com Models representando objetos de negócio e Schemas definindo a estrutura dos dados no banco.
* **Routes**: Define as rotas da API e como elas se relacionam com os controllers.
* **Services**: Lógica de negócio que não pertence diretamente aos controllers ou models, promovendo uma separação clara entre a lógica de apresentação e de domínio.

## Pré-requisitos

Antes de começar, verifique se você tem instalado em sua máquina:
- [Docker](https://www.docker.com/get-started)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Git](https://git-scm.com/)

> **Nota:** A aplicação esta utilizando Docker. A escolha foi devido à sua capacidade de criar contêineres portáteis e isolados, garantindo consistência na execução em diferentes ambientes. Isso simplifica a gestão de dependências, melhora a segurança e facilita a escalabilidade, tornando a aplicação robusta e fácil de implantar.

## Instalação

Passos para instalar e configuração do ambiente de desenvolvimento.

**1. Clone o repositório**

```bash
git clone git@github.com:developerluizgois/mvp-woke-backend.git
```
**2. Acesse a raiz do repositório clonado**
**3. Instale as dependências**
```bash
npm install

ou

yarn install
```

## Ambiente de Desenvolvimento

No diretório raiz deste repositório, você encontrará um arquivo chamado `.env-example`, que contém um modelo da estrutura de variáveis de ambiente. Para configurar corretamente o ambiente, copie este modelo para um novo arquivo chamado `.env`, também localizado na raiz do repositório. Em seguida, preencha as informações solicitadas com os dados fornecidos pelo autor deste repositório. Conteúdo esperado do arquivo .env:

```env
DBUSER=
DBPASSWORD=
DBCOLLECTION=
SECRET_KEY=
```

> **Nota:** MongoDB foi escolhido como banco de dados NoSQL por ser altamente escalável e flexível, adequado para aplicações onde os dados têm uma estrutura variável ou semiestruturada, como perfis de usuário nesse caso.

## Iniciar o servidor

**1. Fazer o Build da imagem docker**

No diretório raiz deste repositório abra o terminal do editor de texto que voce estiver utilizando e execulte o comando abaixo:

```bash
docker-compose up --build
```

> **Nota:** Este comando irá construir sua imagem de backend com base no Dockerfile especificado e iniciar todos os serviços definidos no docker-compose.yml.

**2. Visualizando a API**

Para visualizar a API que está sendo executada no servidor Docker que você acabou de iniciar, siga os passos abaixo:

1. Abra seu navegador web.
2. Cole a URL abaixo na barra de endereços e pressione Enter:

   - [http://localhost:3001/api/v1/status](http://localhost:3001/api/v1/status)

3. Você deverá ver uma resposta da API, indicando que o servidor está funcionando corretamente.

## Testes automatizados

Estamos utilizando o [supertest](https://www.npmjs.com/package/supertest) para nossa API, permitindo simular requisições HTTP ao servidor Express.js de forma automatizada. Ele simplifica a escrita de testes de integração, verifica respostas HTTP e facilita a assertividade nos testes, tudo isso com uma configuração fácil e suporte robusto da comunidade.

1. Para executar todos os testes, execute o comando abaixo no terminal, no diretório raiz do repositório deste projeto.

```bash
npm test
```

2. Para executar o teste de um arquivo específico, execute o comando abaixo no terminal, no diretório raiz do repositório deste projeto.

```bash
npm test <nomedoarquivo.spec.ts>
```

> **Nota:** Todos os comandos disponíveis estão listados no arquivo package.json, sob a seção de scripts.

# Documentação da API

## Introdução
Bem-vindo à documentação da nossa API. Esta API permite interagir com o banco de Dados MongoDB configurado para esse projeto.

## Autenticação
Para acessar os endpoints protegidos desta API, é necessário autenticação utilizando Bearer Token. Envie o token de acesso no cabeçalho `Authorization`.

Exemplo:

Authorization: Bearer seu_token_aqui

## URL BASE

[http://localhost:3001/api/v1](http://localhost:3001/api/v1)

## Acessando os Endpoints com Postman
Recomendamos utilizar o [Postman](https://www.postman.com/) para explorar e testar os endpoints da nossa API. Siga os passos abaixo para começar:

1. **Baixe e instale o Postman**: Se você ainda não tiver o Postman instalado, você pode baixá-lo [aqui](https://www.postman.com/downloads/).

2. **Configure Variáveis de Ambiente**:
   - No Postman, configure as variáveis de ambiente necessárias, como a URL base da API e o token de autenticação.
   - Você pode definir essas variáveis no nível da coleção ou na execução de cada solicitação.

3. **Explorando os Endpoints**:
   - Agora você pode explorar todos os endpoints da API diretamente no Postman.
   - Cada solicitação na coleção importada contém exemplos de como usar cada endpoint com diferentes métodos HTTP (GET, POST, PUT, DELETE).

4. **Executando e Testando**:
   - Execute as solicitações para interagir com a API e observe as respostas.
   - Use a seção de "Tests" do Postman para validar as respostas da API conforme necessário.

## Endpoints

### Usuários

#### Criar Usuário
- **URL**: `POST` [http://localhost:3001/api/v1/user/register](http://localhost:3001/api/v1/user/register)
- **Parâmetros de Requisição**: Nenhum.
- **Autenticação**: Não é necessário token de autenticação.
- **Corpo da Requisição**:
  ```json
  {
    "username": "username",
    "fullName": "firstname Lastname",
    "email": "email@company.com",
    "password": "*******",
    "phone": "12345678910",
    "dateOfBirth": "11/11/2011"
  }
  ```
  * username (string): identificador de usuário.
  * fullName (string): Nome completo do usuário.
  * email (string): Endereço de email do usuário.
  * password (string): Senha de acesso do usuário.
  * phone (string): Número de telefone do usuário.
  * dateOfBirth (string): Data de nascimento do usuário no formato "DD-MM-AAAA".
- **Resposta 201 (CREATED)**:
  ```json
  {
    "message": "Usuário criado com sucesso",
    "user": {
        "id": "6689b0bdda818ddb4ee5a552",
        "username": "username",
        "fullName": "Firstname Lastname",
        "email": "email@company.com",
        "phone": "12345678910",
        "dateOfBirth": "2011-11-11T02:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njg5YjBiZGRhODE4ZGRiNGVlNWE1NTIiLCJpYXQiOjE3MjAyOTk3MDksImV4cCI6MTcyMDMwMzMwOX0.X7hIKsW6zs2i1P8q9ujQw-D8Suv856tIuL7K9PkGRi4"
  }
  ```
- **Resposta 404 (BAD REQUEST)**:
  ```json
  {
    "message": "Nome de usuário indisponível"
  }
  ```
- **Resposta 404 (BAD REQUEST)**:
  ```json
  {
    "message": "E-mail já cadastrado"
  }
  ```
- **Resposta 404 (BAD REQUEST)**:
  ```json
  {
    "message": "Número de celular já cadastrado"
  }
  ```
- **Resposta 404 (BAD REQUEST)**:
  ```json
  {
    "message": "Nome de usuário inválido"
  }
  ```
- **Resposta 404 (BAD REQUEST)**:
  ```json
  {
    "message": "Nome completo inválido"
  }
  ```
- **Resposta 404 (BAD REQUEST)**:
  ```json
  {
    "message": "Formato de e-mail inválido"
  }
  ```
- **Resposta 404 (BAD REQUEST)**:
  ```json
  {
    "message": "Senha inválida, verifique se a senha tem pelo menos 8 caracteres e inclui pelo menos um caractere minúsculo, um caractere maiúsculo, um dígito e um caractere especial (@, $, !, %, *, ?, ou &)"
  }
  ```
- **Resposta 404 (BAD REQUEST)**:
  ```json
  {
    "message": "Número de celular inválido"
  }
  ```
- **Resposta 404 (BAD REQUEST)**:
  ```json
  {
    "message": "Data de nascimento inválida"
  }
  ```
#### Autenticar Usuário
- **URL**: `POST` [http://localhost:3001/api/v1/user/login](http://localhost:3001/api/v1/user/login)
- **Parâmetros de Requisição**: Nenhum.
- **Autenticação**: Não é necessário token de autenticação.
- **Corpo da Requisição**:
  ```json
  {
    "username": "username",
    "password": "*******",
  }
  ```
  * username (string): identificador de usuário.
  * password (string): Senha de acesso do usuário.

Para fazer login disponibilizamos duas opções, acima você realizar login com seu usuário e abaixo você utiliza seu E-mail. Qualquer uma das opções realiza a autenticação.

- **Corpo da Requisição**:
  ```json
  {
    "email": "email",
    "password": "*******",
  }
  ```
  * email (string): Endereço de email do usuário.
  * password (string): Senha de acesso do usuário.
- **Resposta 200 (OK)**:
  ```json
  {
    "message": "Usuário autenticado com sucesso",
    "user": {
        "id": "6689b0bdda818ddb4ee5a552",
        "username": "username",
        "fullName": "Firstname Lastname",
        "email": "email@company.com",
        "phone": "12345678910",
        "dateOfBirth": "2011-11-11T02:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njg5YjBiZGRhODE4ZGRiNGVlNWE1NTIiLCJpYXQiOjE3MjAyOTk3MDksImV4cCI6MTcyMDMwMzMwOX0.X7hIKsW6zs2i1P8q9ujQw-D8Suv856tIuL7K9PkGRi4"
  }
  ```
- **Resposta 401 (UNAUTHORIZED)**:
  ```json
  {
    "message": "Credenciais inválidas."
  }
  ```

#### Buscar dados de um usuário
- **URL**: `POST` [http://localhost:3001/api/v1/user/:id](http://localhost:3001/api/v1/user/:id)
- **Parâmetros de Requisição**: id do usuário.
- **Autenticação**: Bearer Token (Authorization).
- **Corpo da Requisição**: Não é necessário corpo da requisição.
- **Resposta 200 (OK)**:
  ```json
  {
    "message": "Dados do usuário obtidos com sucesso",
    "user": {
        "username": "username",
        "fullName": "Firstname Lastname",
        "email": "email@company.com",
        "phone": "12345678910",
        "dateOfBirth": "2011-11-11T02:00:00.000Z"
    }
  }
  ```
  - **Resposta 403 (FORBIDDEN)**:
  ```json
  {
    "message": "O token não corresponde ao ID fornecido.",
  }
  ```
  - **Resposta 404 (NOT_FOUND)**:
  ```json
  {
    "message": "Usuário não encontrado",
  }
  ```









#### Enviar dados de um usuário para uma empresa
- **URL**: `POST` [http://localhost:3001/api/v1/send/:id](http://localhost:3001/api/v1/send/:id)
- **Parâmetros de Requisição**: id do usuário.
- **Autenticação**: Bearer Token (Authorization).
- **Corpo da Requisição**:
  ```json
  {
    "company": "company",
  }
  ```
  * company (string): Nome da empresa que receberá os dados do usuário.
- **Resposta 200 (OK)**:
  ```json
  {
    "message": "Dados enviados com sucesso para <Nome da empresa>",
  }
  ```
  - **Resposta 403 (FORBIDDEN)**:
  ```json
  {
    "message": "O token não corresponde ao ID fornecido.",
  }
  ```
  - **Resposta 404 (NOT_FOUND)**:
  ```json
  {
    "message": "Usuário não encontrado",
  }
  ```
  - **Resposta 400 (BAD REQUEST)**:
  ```json
  {
    "message": "Nome da empresa inválido ou não informado",
  }
  ```
