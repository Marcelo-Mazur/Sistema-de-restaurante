# 🍽️ Sistema de Gestão de Restaurante (Back-end)

Este projeto é uma Web API desenvolvida em C# para gerenciar as operações de um restaurante, incluindo autenticação de usuários, gerenciamento de cardápio, carrinho de compras e finalização de pedidos.

Projeto desenvolvido para a avaliação **A2-1** da disciplina de **Desenvolvimento Web Avançado (DWA)**.

## 🚀 Tecnologias e Arquitetura
* **Linguagem:** C# (.NET 9/10)
* **Banco de Dados:** SQLite (Entity Framework Core)
* **Padrão de Projeto:** Repository Pattern
* **Organização:** Separação em camadas (Controllers, Models e Repository)

## 🛠️ Funcionalidades e Endpoints

### 🔐 Autenticação (`/api/auth`)
* `POST /api/auth/cadastro` — Registra um novo usuário e retorna o token de sessão.
* `POST /api/auth/login` — Autentica um usuário existente e retorna o token de sessão.

### 📋 Cardápio (`/api/cardapio`)
* `GET /api/cardapio` — Lista todos os itens do cardápio.
* `GET /api/cardapio/{id}` — Retorna os detalhes de um item específico.
* `POST /api/cardapio` — Adiciona um novo item ao cardápio.
* `PUT /api/cardapio/{id}` — Atualiza os dados de um item do cardápio.
* `DELETE /api/cardapio/{id}` — Remove um item do cardápio.

### 🛒 Carrinho e Pedidos (`/api/pedidos`)
* `GET /api/pedidos` — Lista todos os pedidos.
* `GET /api/pedidos/{id}` — Retorna os detalhes de um pedido específico.
* `GET /api/pedidos/usuario/{usuarioId}` — Lista todos os pedidos de um usuário.
* `POST /api/pedidos` — Cria um novo pedido com itens (status inicial: `Aberto`).
* `PUT /api/pedidos/{id}/status` — Atualiza o status de um pedido.
* `DELETE /api/pedidos/{id}` — Remove um pedido.
* `GET /api/pedidos/carrinho/{usuarioId}` — Retorna o carrinho ativo (status `Aberto`) do usuário.
* `POST /api/pedidos/carrinho/{usuarioId}` — Adiciona um item ao carrinho (cria o carrinho se não existir).
* `PUT /api/pedidos/carrinho/item/{itemPedidoId}` — Atualiza a quantidade de um item do carrinho.
* `DELETE /api/pedidos/carrinho/item/{itemPedidoId}` — Remove um item do carrinho.
* `POST /api/pedidos/carrinho/{usuarioId}/finalizar` — Finaliza o carrinho, alterando o status para `EmPreparo`.

### 💰 Pagamentos (`/api/pagamentos`)
* `GET /api/pagamentos` — Lista todos os pagamentos.
* `GET /api/pagamentos/{id}` — Retorna os detalhes de um pagamento específico.
* `GET /api/pagamentos/pedido/{pedidoId}` — Retorna o pagamento associado a um pedido.
* `POST /api/pagamentos` — Registra o pagamento de um pedido e altera seu status para `EmPreparo`.
* `PUT /api/pagamentos/{id}/cancelar` — Cancela um pagamento.

## 📋 Requisitos Acadêmicos Atendidos (Prof. Marlon)
* **Persistência:** Uso de SQLite com mapeamento via EF Core.
* **Repository Pattern:** Implementado para isolar a lógica de banco de dados.
* **Lógica de Negócio:** Implementada no fluxo de carrinho, checkout, formas de pagamento e controle de status de pedidos.

## 🔧 Como rodar o projeto localmente
Se houver conflitos de versão entre .NET 9 e 10, utilize os comandos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/Marcelo-Mazur/Sistema-de-restaurante.git
   ```
2. Acesse a pasta do projeto e execute:
   ```bash
   dotnet run
   ```
