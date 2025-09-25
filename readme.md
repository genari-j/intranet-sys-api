## Intranet Sys - API 🚀

<div align="center">

  ![Static Badge](https://img.shields.io/badge/Node-0A9047?style=for-the-badge&logo=node.js&labelColor=black)
  ![Static Badge](https://img.shields.io/badge/fastify-000000?style=for-the-badge&logo=fastify&logoColor=white&labelColor=black)
  ![Static Badge](https://img.shields.io/badge/typescript-0B88F7?style=for-the-badge&logo=typescript&logoColor=0B88F7&labelColor=black)
  ![Static Badge](https://img.shields.io/badge/prisma-063E7C?style=for-the-badge&logo=prisma&logoColor=white&labelColor=black)
  ![Static Badge](https://img.shields.io/badge/MySQL-0B7FAA?style=for-the-badge&logo=mysql&logoColor=%23000&labelColor=orange)
  ![Static Badge](https://img.shields.io/badge/ZOD-0822A2?style=for-the-badge&logo=zod&logoColor=%23000&labelColor=1481FC)
  ![Static Badge](https://img.shields.io/badge/dotenv-D0D302?style=for-the-badge&logo=.env&logoColor=D0D302&labelColor=black)
  ![Static Badge](https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white&labelColor=000)
  ![Static Badge](https://img.shields.io/badge/biome-00B7FF?style=for-the-badge&logo=biome&logoColor=white&labelColor=000)

</div>

### 📘 Visão Geral - API

Esta API foi desenvolvida utilizando Fastify e TypeScript, com o objetivo de centralizar e unificar as funcionalidades dos principais sistemas internos de uma organização. A estrutura do projeto foi desenhada para ser modular, clara e escalável, agrupando as regras de negócio em pastas por domínio: Controllers, Repositories, Routes e UseCases.

Apesar da separação lógica entre os sistemas, todas as funcionalidades compartilham um único banco de dados relacional, o que simplifica a integração entre os módulos e facilita o gerenciamento centralizado de dados.

A aplicação está utilizando como principais tecnologias: **[Node](https://nodejs.org/en), [Fastify](https://fastify.dev/), [Typescript](https://www.typescriptlang.org/), [Prisma](https://www.prisma.io/), [ZOD](https://zod.dev/)** e **[MySQL](https://www.mysql.com/)** como Banco de dados.

#### Tabela de conteúdo

- [Sistemas](#sistemas)
- [Instalação](#instalação)
- [Usabilidade](#usabilidade)
- [Autenticação](#autenticação)
- [Notificações](#notificações)
- [Database](#database)

#### Sistemas

- Sistema de Chamados
- Sistema de Estoque
- Sistema de E-commerce
- Sistema de Gerenciamento de Usuários
- Sistema de Documentos
- Sistema de Notícias Corporativas
- Sistema de Registro de Ponto
- Sistema de Compras

Cada sistema possui suporte completo para as operações CRUD (Create, Read, Update, Delete), além de funcionalidades específicas, como:

- Autenticação (Sign-in/Sign-up)
- Gerenciamento de permissões por usuário
- Rotas de dashboard com dados consolidados
- Middlewares para validação, autenticação e controle de acesso
- Seeds para inicialização de dados em ambientes locais

#### Instalação

1. Clone o repositório:

    - `git clone https://github.com/genari-j/intranet-sys-api.git`

2. Instale as dependências com yarn

    - `yarn`

3. Crie um Banco de Dados em sua máquina

    - Recomendável (MySQL)
    - Esteja ciente que o serviço de db esteja rodando
    - O projeto está rodando com `Prisma` e caso queira alterar o serviço de Banco, pode começar alterando o provider identificado no arquivo `schema.prisma`

4. Configurando Variáveis de Ambiente

    - Note que há um arquivo .env.example na raiz
    - Apenas crie outro arquivo na raiz com o nome `.env` preenchendo as variáveis do .env.example

5. Rode as migrações e as Seeds apontando para o DB criado

    - Aplicando migrações ->
        - `npx prisma generate`
        - `npx prisma migrate dev`
    - Populando o DB com seeds ->
        - `npx prisma db seed`

#### Usabilidade

1. Inicie a aplicação com yarn -> `yarn dev`

2. A API ficará acessível em -> `http://localhost:3002/`
    - Caso tenha colocado outra porta, apenas altere `3002` para sua porta;

#### Autenticação

1. Para acessar a aplicação, basta utilizar o usuário administrador criado pela própria seed de usuários:
    - Credenciais -> `Login: 00511` e `Senha: 123456`

2. O sistema está lidando com permissões de usuários. Ao criar um usuário, são definidas também suas permissões. Dependendo do nível de rota acessada, as funcionalidades estarão liberadas somente se a permissão tiver sido concedida na criação do usuário.

3. Como está funcionando o sistema de permissões? Com base no exemplo abaixo, o usuário terá acesso a permissão de deletar notícias se assim for adicionado no momento da criação de seu usuário
    - Há uma Tabela no Banco guardando as permissões:
        - Exemplo nome permissão: `Deletar notícias`
    - Há outra tabela guardando o id do usuário + o id da permissão
        - Exemplo de relacionamento: `permission_id` + `user_id`

4. Como eu poderia criar uma permissão nova?
    - Acesse a Tabela `permissions` e adicione uma nova permissão.
    - Acesse a Tabela `user_permissions` e adicione o relacionamento entre `user_id` e `permission_id`

#### Notificações

As notificações em tempo real são uma parte essencial do sistema, proporcionando uma comunicação instantânea entre a aplicação e os usuários. O sistema utiliza `Socket.IO` para transmitir notificações aos usuários com base em eventos específicos que acontecem dentro da aplicação. Essas notificações são disparadas de forma dinâmica e direcionada, podendo ser enviadas para um ou mais usuários dependendo da ação realizada.

1. Exemplos de Ações que Disparam Notificações:

    - Notícias: Quando uma nova notícia é cadastrada no sistema, todos os usuários que têm acesso à plataforma recebem uma notificação.
    - Chamados: Quando um chamado é aberto por qualquer usuário, as pessoas envolvidas no processo (ex: solicitante, equipe responsável) recebem uma notificação.
    - Mudanças: Sempre que há uma atualização em um chamado (como mudança de status, atribuição de um responsável, etc.), todos os usuários envolvidos recebem notificações.
    - Compras: Quando uma solicitação de compra é registrada, as partes envolvidas no processo (responsável pela aprovação ou a equipe de compras) recebem uma notificação.

#### Database
É recomendável utilizar o [MySQL](https://www.mysql.com/) como Banco de Dados. Abaixo está listado novamente os comandos para lidar com Migrações e Seeds.

  - Aplicando migrações -> `npx prisma migrate dev`
  - Populando o DB com seeds -> `npx prisma db seed`
  - O projeto está está utilizando [Prisma](https://www.prisma.io/) e caso queira alterar o serviço de Banco, é necessário alterar também o provider no arquivo `schema.prisma`