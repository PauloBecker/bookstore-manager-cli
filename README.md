# 📚 BookStore Manager CLI

## 📖 Descrição do Projeto
O **BookStore Manager CLI** é uma aplicação de terminal desenvolvida em **Node.js** com **TypeScript** para gerenciamento de uma livraria.  
Permite administrar **autores, livros, clientes e empréstimos**, substituindo registros manuais por uma solução informatizada com persistência em **PostgreSQL**.

---

## 🎯 Objetivo
Consolidar os conhecimentos adquiridos no módulo de Back-End, aplicando:
- Programação orientada a objetos
- Arquitetura em camadas
- Programação assíncrona
- Modelagem de banco de dados relacional
- Boas práticas de desenvolvimento (Clean Code e SOLID)

---

## 🛠️ Tecnologias Utilizadas
- Node.js
- TypeScript
- PostgreSQL
- Biblioteca `pg` para conexão
- Git e GitHub (versionamento)

---

## ⚙️ Requisitos para Execução
- Node.js versão 18+
- PostgreSQL instalado e configurado
- NPM ou Yarn
- Arquivo `.env` configurado com credenciais do banco

---

## 🗄️ Configuração do Banco de Dados
1. Crie um banco de dados PostgreSQL:
   ```sql
   CREATE DATABASE bookstore_manager;

2. Execute o script `schema.sql` localizado em `src/database/connections/` para criar as tabelas:

- **autores**
- **livros**
- **clientes**
- **emprestimos**

### Estrutura principal das tabelas

```sql
CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(50),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    ano_publicacao INT,
    quantidade INT DEFAULT 1,
    quantidade_disponivel INT DEFAULT 0,
    autor_id INT NOT NULL,
    FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE CASCADE
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE
);

CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY,
    livro_id INT NOT NULL,
    cliente_id INT NOT NULL,
    data_emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
    data_devolucao DATE,
    devolvido BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (livro_id) REFERENCES livros(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

```

### Dados iniciais (seed)

```sql
INSERT INTO autores (nome, nacionalidade, data_nascimento)
VALUES 
  ('Machado de Assis', 'Brasileiro', '1839-06-21'),
  ('Clarice Lispector', 'Brasileira', '1920-12-10'),
  ('George Orwell', 'Britânico', '1903-06-25');

INSERT INTO livros (titulo, ano_publicacao, quantidade, autor_id)
VALUES
  ('Dom Casmurro', 1899, 5, 1),
  ('A Hora da Estrela', 1977, 3, 2),
  ('1984', 1949, 4, 3);

INSERT INTO clientes (nome, email, telefone)
VALUES
  ('Paulo Becker', 'paulo@example.com', '48999999999'),
  ('Maria Silva', 'maria@example.com', '48988888888'),
  ('João Souza', 'joao@example.com', '48977777777');

INSERT INTO emprestimos (livro_id, cliente_id, data_emprestimo)
VALUES
  (1, 1, CURRENT_DATE),
  (2, 2, CURRENT_DATE),
  (3, 3, CURRENT_DATE);
  ```

### Para executar o script
```bash
psql -U seu_usuario -d bookstore_manager -f src/database/connections/schema.sql
```
## 📦 Instalação
```bash
git clone https://github.com/PauloBecker/bookstore-manager-cli.git
cd bookstore-manager-cli
npm install
```
## ▶️ Execução
```bash
npm run dev
```
# O sistema será iniciado no terminal e exibirá o menu principal.

## 🏗️ Arquitetura do Projeto
# A aplicação segue arquitetura em camadas:

```
BOOKSTORE-MANAGER-CLI/
│
├── src/
│   ├── main.ts              # Ponto de entrada
│   ├── controllers/         # Controllers (CLI)
│   ├── services/            # Regras de negócio
│   ├── repositories/        # Acesso ao banco
│   ├── models/              # Entidades e interfaces
│   ├── database/            # Conexão e schema SQL
│   ├── menus/               # Menus CLI
│   └── utils/               # Funções auxiliares
│
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore

```
## ⚡ Funcionalidades Implementadas

- **Autores**: cadastrar, listar, consultar, atualizar, remover  
- **Livros**: cadastrar, listar, consultar, atualizar, remover  
- **Clientes**: cadastrar, listar, consultar, atualizar, remover  
- **Empréstimos**: registrar, listar, consultar, devolver, remover

### Relatórios
- **Livros disponíveis**
- **Livros emprestados**
- **Livros cadastrados por autor**  
- **Quantidade de empréstimos por livro**  
- **Clientes com empréstimos ativos**

## 📂 Estrutura de Pastas

Vide seção **Arquitetura do Projeto**.

## 💻 Exemplos de Utilização

### Cadastrar autor
```
Escolha uma opção: 1
Nome do autor: Machado de Assis
✅ Autor cadastrado com sucesso!

```

## 💻 Exemplos de Utilização

### Registrar empréstimo
```
Escolha uma opção: 1
ID do cliente: 2
ID do livro: 5
✅ Empréstimo registrado!

```
## 👥 Integrantes da Equipe

- Paulo Becker (desenvolvedor responsável)






