# 🍽️ Sistema de Gestão de Restaurante (Back-end)

Este projeto é uma Web API desenvolvida em C# para gerenciar as operações de um restaurante, incluindo autenticação de usuários, gerenciamento de cardápio, carrinho de compras e finalização de pedidos.

Projeto desenvolvido para a avaliação **A2-1** da disciplina de **Desenvolvimento Web Avançado (DWA)**.

## 🚀 Tecnologias e Arquitetura
* **Linguagem:** C# (.NET 9/10)
* **Banco de Dados:** SQLite (Entity Framework Core)
* **Padrão de Projeto:** Repository Pattern
* **Organização:** Separação em camadas (Controllers, Models e Repository)

## 🛠️ Funcionalidades e Endpoints

### 🔐 Autenticação e Usuários
* `POST /Login`: Autenticação de usuários.
* `POST /Cadastro`: Registro de novos clientes.

### 📋 Cardápio (Entidades Relacionadas)
* `GET /Cardapio`: Lista todos os itens disponíveis.
* `GET /Cardapio/{id}`: Detalhes de um item específico.

### 🛒 Carrinho (CRUD Completo)
* `GET /Carrinho`: Visualiza os itens selecionados.
* `POST /Carrinho`: Adiciona produtos ao carrinho.
* `PUT /Carrinho/{id}`: Atualiza quantidades.
* `DELETE /Carrinho/{id}`: Remove produtos.

### 💰 Checkout e Gestão de Pedidos
* `POST /FinalizarCompra`: Lógica de pagamento e fechamento do pedido.
* `GET /Pedidos`: Consulta de pedidos em andamento (status "fazendo" e "em andamento").

## 📋 Requisitos Acadêmicos Atendidos (Prof. Marlon)
* **Persistência:** Uso de SQLite com mapeamento via EF Core.
* **Repository Pattern:** Implementado para isolar a lógica de banco de dados.
* **Lógica de Negócio:** Implementada no fluxo de checkout, formas de pagamento e controle de status de pedidos.

## 🔧 Como rodar o projeto localmente
Se houver conflitos de versão entre .NET 9 e 10, utilize os comandos abaixo:

1. Clone o repositório:
   ```bash
   git clone [https://github.com/Marcelo-Mazur/Sistema-de-restaurante.git](https://github.com/Marcelo-Mazur/Sistema-de-restaurante.git)
