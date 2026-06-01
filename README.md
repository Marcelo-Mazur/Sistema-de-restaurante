# Sistema de Restaurante

Projeto desenvolvido para a disciplina **Desenvolvimento Web Avancado**, com o objetivo de evoluir a entrega A2-1 para a avaliacao **A2-2: Desenvolvimento de Web API com frontend React**.

Professor: **Marlon**

## Integrantes da equipe

- João Pedro Marinho de Holanda
- Leonardo Satoru Osugi
- Marcelo Sant Anna Mazur Roland
- Nicolas Matheus Faustino

## Descricao do sistema

O Sistema de Restaurante e uma aplicacao web completa para gerenciamento de cardapio, carrinho, pedidos, pagamentos e autenticacao de usuarios.

O backend foi desenvolvido em C# com ASP.NET Core Web API, Entity Framework Core, SQLite e Repository Pattern. O frontend foi desenvolvido em React com Vite e consome a API por meio de requisicoes HTTP.

## Objetivos atendidos

- Frontend React com Vite
- Comunicacao HTTP entre frontend e backend
- Integracao com Web API em C#
- Persistencia com Entity Framework Core
- Repository Pattern no backend
- Autenticacao com JWT
- Componentizacao no frontend
- Uso de hooks como `useState`, `useEffect`, hooks customizados e renderizacao dinamica
- Eventos de interface, formularios, carrinho, checkout e historico de pedidos

## Tecnologias utilizadas

### Backend

- C#
- ASP.NET Core Web API
- .NET 9
- Entity Framework Core
- SQLite
- JWT Bearer
- BCrypt
- Swagger
- Repository Pattern

### Frontend

- React
- Vite
- JavaScript
- React Router
- Axios
- Tailwind CSS
- Lucide React

## Estrutura do projeto

```text
Sistema-de-restaurante/
  Backend/
    Controllers/
    Models/
    Repositories/
    Migrations/
    Program.cs
    AppDbContext.cs

  Frontend/
    src/
      components/
      hooks/
      pages/
      services/
      constants/
```

## Funcionalidades

- Cadastro de usuarios
- Login com JWT
- Logout
- Listagem dinamica do cardapio
- Busca e filtro por categoria
- Adicao de itens ao carrinho
- Atualizacao da quantidade dos itens
- Remocao de itens do carrinho
- Finalizacao do carrinho
- Registro de pagamento
- Historico de pedidos do usuario

## Como executar o projeto

### Requisitos

- .NET 9 SDK
- Node.js
- npm
- Git

### 1. Clonar o repositorio

```bash
git clone <link-do-repositorio>
cd Sistema-de-restaurante
```

### 2. Executar o backend

```bash
cd Backend
dotnet restore
dotnet run
```

A API sera executada em:

```text
http://localhost:5017
```

Em ambiente de desenvolvimento, o Swagger pode ser acessado em:

```text
http://localhost:5017/swagger
```

### 3. Executar o frontend

Em outro terminal:

```bash
cd Frontend
npm install
```

Crie o arquivo `.env` com base no exemplo:

```bash
cp .env.exemple .env
```

Configure a URL da API:

```env
VITE_API_URL=http://localhost:5017/
```

Execute o frontend:

```bash
npm run dev
```

## Scripts do frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Endpoints principais

### Autenticacao

| Metodo | Endpoint | Descricao |
| --- | --- | --- |
| POST | `/api/auth/cadastro` | Cadastra um novo usuario |
| POST | `/api/auth/login` | Autentica o usuario e retorna um token JWT |
| POST | `/api/auth/logout` | Remove a sessao/token salvo |

### Cardapio

| Metodo | Endpoint | Descricao |
| --- | --- | --- |
| GET | `/api/cardapio` | Lista os itens do cardapio |
| GET | `/api/cardapio/{id}` | Busca um item especifico |
| POST | `/api/cardapio` | Cadastra um item no cardapio |
| PUT | `/api/cardapio/{id}` | Atualiza um item do cardapio |
| DELETE | `/api/cardapio/{id}` | Remove um item do cardapio |

### Pedidos e carrinho

| Metodo | Endpoint | Descricao |
| --- | --- | --- |
| GET | `/api/pedidos` | Lista todos os pedidos |
| GET | `/api/pedidos/{id}` | Busca um pedido especifico |
| GET | `/api/pedidos/usuario/{usuarioId}` | Lista pedidos de um usuario |
| POST | `/api/pedidos` | Cria um pedido |
| GET | `/api/pedidos/carrinho/{usuarioId}` | Busca o carrinho ativo do usuario |
| POST | `/api/pedidos/carrinho/{usuarioId}` | Adiciona item ao carrinho |
| PUT | `/api/pedidos/carrinho/item/{itemPedidoId}` | Atualiza quantidade de um item |
| DELETE | `/api/pedidos/carrinho/item/{itemPedidoId}` | Remove item do carrinho |
| POST | `/api/pedidos/carrinho/{usuarioId}/finalizar` | Finaliza o carrinho |
| PUT | `/api/pedidos/{id}/status` | Atualiza o status de um pedido |
| DELETE | `/api/pedidos/{id}` | Remove um pedido |

### Pagamentos

| Metodo | Endpoint | Descricao |
| --- | --- | --- |
| GET | `/api/pagamentos` | Lista pagamentos |
| GET | `/api/pagamentos/{id}` | Busca um pagamento especifico |
| GET | `/api/pagamentos/pedido/{pedidoId}` | Busca pagamento de um pedido |
| POST | `/api/pagamentos` | Registra pagamento |
| PUT | `/api/pagamentos/{id}/cancelar` | Cancela pagamento |

## Autenticacao JWT

A autenticacao utiliza JWT no backend e armazenamento do token no frontend.

Fluxo:

1. O usuario faz login em `POST /api/auth/login`.
2. O backend valida email e senha.
3. Se os dados forem validos, a API gera um token JWT.
4. O frontend salva o token no `localStorage` como `tokenSessao`.
5. O cliente HTTP central, localizado em `Frontend/src/services/api.js`, envia automaticamente o token nas requisicoes usando o cabecalho:

```http
Authorization: Bearer <token>
```

O token inclui informacoes como email, id do usuario e tipo de usuario.

## Observacoes para avaliacao

- O backend representa a evolucao da entrega A2-1.
- O frontend React foi integrado ao backend existente.
- O projeto possui hooks customizados para autenticacao, carrinho, checkout, pedidos, cardapio e notificacoes.
- O banco SQLite local e arquivos `.env` nao devem ser versionados.
- As migrations do Entity Framework devem ser mantidas no repositorio.
- O cliente HTTP do frontend esta centralizado em `Frontend/src/services/api.js`.
