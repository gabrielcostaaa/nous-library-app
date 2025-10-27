<p align="center">
  <img src="images/banner.png" alt="Banner Nous Library App" width="100%">
</p>

<h1 align="center">🏛️ Nous Library App 📖</h1>

<p align="center">
  <em>"A biblioteca como o ato sereno de contemplar a essência"</em>
</p>

<p align="center">
  <img alt="Status do Projeto" src="https://img.shields.io/badge/status-em_desenvolvimento-yellow">
  <img alt="Linguagem Principal" src="https://img.shields.io/badge/typescript-%233178C6.svg?style=flat&logo=typescript&logoColor=white">
  <img alt="Framework Backend" src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=flat&logo=nestjs&logoColor=white">
  <img alt="Framework Frontend" src="https://img.shields.io/badge/react-%2361DAFB.svg?style=flat&logo=react&logoColor=white">
  <img alt="Licença" src="https://img.shields.io/badge/license-MIT-blue">
</p>


## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
  - [O Conceito](#o-conceito)
  - [O Sistema](#o-sistema)
- [✨ Features Principais](#-features-principais)
- [🎨 Design System (UI/UX)](#-design-system-uiux)
  - [Paleta de Cores](#paleta-de-cores)
  - [Tipografia](#tipografia)
- [🛠️ Stack Tecnológica](#-stack-tecnológica)
- [🏛️ Arquitetura](#-arquitetura)
  - [Banco de Dados (Prisma Schema)](#banco-de-dados-prisma-schema)
  - [Backend (Estrutura de Pastas NestJS)](#backend-estrutura-de-pastas-nestjs)
- [🗺️ Documentação da API](#-documentacao-da-api)
- [🚀 Como Executar](#-como-executar)
- [📄 Licença](#-licença)

---

## 📖 Sobre o Projeto

### O Conceito

O nome **"Nous" (νοῦς)** é um termo filosófico grego que representa a **mente**, o **intelecto** ou a **razão intuitiva**. Diferente da *dianoia* (razão discursiva, que processa passo a passo), o *Nous* é a capacidade de captar a verdade de forma imediata, serena e direta.

Este projeto busca traduzir esse conceito em uma aplicação: uma biblioteca digital que não é apenas um repositório de informações, mas uma ferramenta intuitiva que traz ordem e clareza à gestão do conhecimento.

* **Inspiração Visual:** [Social Sciences Library (Behance)](https://www.behance.net/gallery/236204235/Social-Sciences-Library-Mobile-App-Book-Rental)

### O Sistema

O **Nous Library App** é um sistema full-stack de gerenciamento de biblioteca. Ele inclui um backend robusto (API REST) para administrar usuários, livros e empréstimos, e um frontend (Dashboard) para interação administrativa.

O foco do projeto é construir uma aplicação segura, modular e escalável, com lógica de negócio complexa, como cálculos financeiros de multas, aluguéis e regras de desconto.

## ✨ Features Principais

A aplicação é dividida em dois portais principais: o Dashboard Administrativo e o Portal do Usuário (cliente).

### Painel Administrativo (Admin)

- **Autenticação Segura:** Login de administrador com [JWT](https://jwt.io/) e [Bcrypt](https://pt.wikipedia.org/wiki/Bcrypt) para hashing de senhas.
- **Gestão de Empréstimos:**
  - Registro de novos empréstimos (vínculo de usuário + livro).
  - Listagem e filtragem de empréstimos (`ativos`, `atrasados`, `devolvidos`).
- **Cálculos Financeiros:**
  - Cálculo dinâmico de **multas** por atraso (`GET /loans/{id}/fine`).
  - Cálculo do **valor do aluguel** (`GET /loans/{id}/rental`).
- **Regras de Negócio:**
  - Lógica para aplicação de **descontos** (ex: 50% no primeiro atraso).
- **Gestão de Entidades:**
  - CRUD completo de **Livros** (título, autor, preço-base).
  - CRUD completo de **Usuários** (criação de usuários comuns e novos administradores).

### Portal do Usuário (Cliente)

- **Cadastro Público:** Usuários comuns podem se registrar no sistema.
- **Catálogo:** Visualização do acervo de livros.
- **Meu Perfil:** Acesso ao histórico de empréstimos, datas de devolução e multas pendentes.

## 🎨 Design System (UI/UX)

Para refletir o conceito de "Nous", a identidade visual é sóbria, acadêmica e estruturada, misturando o clássico e o moderno.

### Paleta de Cores

| Cor | Hex | Uso |
| :--- | :--- | :--- |
| 🔵 **Azul Egeu** | `#2B3A67` | Cor primária (ações, links, títulos) |
| ⚪ **Mármore** | `#F5F5F3` | Fundo principal da aplicação |
| ⚫ **Pedra Escura** | `#333333` | Texto principal (corpo) |
| 🔘 **Pedra Clara** | `#E0E0E0` | Divisores, bordas, fundos secundários |
| 🟡 **Ouro Antigo** | `#B8860B` | Destaques sutis, ícones especiais |
| 🟢 **Oliva** | `#6B8E23` | Mensagens de sucesso |
| 🔴 **Terracota** | `#B24C42` | Mensagens de erro e alerta (atrasos) |

### Tipografia

- **Títulos (Headings):** [Lora](https://fonts.google.com/specimen/Lora)  
  Uma fonte serifada elegante e "livresca", trazendo a seriedade acadêmica.
- **Corpo & UI (Body):** [Inter](https://fonts.google.com/specimen/Inter)  
  Uma fonte sans-serif moderna, otimizada para legibilidade máxima em interfaces (tabelas, botões, formulários).

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Justificativa |
| :--- | :--- | :--- |
| **Backend** | **NestJS (Node.js)** | Framework Typescript para arquitetura modular e organizada (SRP). |
|  | **Prisma** | ORM moderno com alta type-safety para integração com NestJS. |
|  | **JWT + Passport + Bcrypt** | Padrão de indústria para autenticação segura e hashing de senhas. |
|  | **Zod** | Validação de dados em tempo de execução e inferência de tipos. |
| **Frontend** | **Vite + React** | Ambiente de dev rápido (Vite) e biblioteca UI reativa (React). |
|  | **Typescript** | Garante consistência e segurança de tipos no frontend. |
|  | **shadcn/ui + Tailwind v4** | Componentes acessíveis e estilização rápida com utility-first CSS. |
|  | **TanStack Query** | Gerenciamento de estado assíncrono (data fetching e caching). |
|  | **React Hook Form + Zod** | Formulários performáticos com validação de schema integrada. |
|  | **React Router** | Gerenciamento de rotas do lado do cliente (client-side routing). |
| **Banco de Dados** | **PostgreSQL** | Banco de dados relacional robusto, confiável e escalável. |

## 🏛️ Arquitetura

O projeto segue os princípios de **Código Limpo**, **Modularidade** e **Separação de Responsabilidades (SoC)**.

### Banco de Dados (Prisma Schema)

```prisma
enum Role {
  ADMIN
  USER
}

enum LoanStatus {
  ACTIVE
  OVERDUE
  RETURNED
}

model User {
  id        String   @id @default(uuid()) @map("usr_id")
  name      String   @map("usr_name")
  email     String   @unique @map("usr_email")
  password  String   @map("usr_password")
  role      Role     @default(USER) @map("usr_role")
  createdAt DateTime @default(now()) @map("usr_created_at")
  updatedAt DateTime @updatedAt @map("usr_updated_at")

  loans Loan[]

  @@map("users")
}

model Book {
  id        String   @id @default(uuid()) @map("bok_id")
  title     String   @map("bok_title")
  author    String   @map("bok_author")
  basePrice Float    @map("bok_base_price")
  createdAt DateTime @default(now()) @map("bok_created_at")
  updatedAt DateTime @updatedAt @map("bok_updated_at")

  loans Loan[]

  @@map("books")
}

model Loan {
  id                  String     @id @default(uuid()) @map("lon_id")
  userId              String     @map("lon_usr_id")
  bookId              String     @map("lon_bok_id")
  loanDate            DateTime   @default(now()) @map("lon_loan_date")
  dueDate             DateTime   @map("lon_due_date")
  returnDate          DateTime?  @map("lon_return_date")
  status              LoanStatus @default(ACTIVE) @map("lon_status")
  fineDiscountApplied Boolean    @default(false) @map("lon_fine_discount_applied")

  createdAt DateTime @default(now()) @map("lon_created_at")
  updatedAt DateTime @updatedAt @map("lon_updated_at")

  user User @relation(fields: [userId], references: [id])
  book Book @relation(fields: [bookId], references: [id])

  @@map("loans")
}
````

### Backend (Estrutura de Pastas NestJS)

```plaintext
seu-projeto/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── 0-main/
│   │   └── main.ts
│   ├── 1-app/
│   │   └── app.module.ts
│   ├── 2-common/
│   │   ├── database/
│   │   └── guards/
│   ├── 3-features/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── strategies/
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── dto/
│   │   ├── books/
│   │   │   ├── books.controller.ts
│   │   │   ├── books.service.ts
│   │   │   └── dto/
│   │   └── loans/
│   │       ├── loans.controller.ts
│   │       ├── loans.service.ts
│   │       └── dto/
├── test/
├── .env
└── package.json
```

## 🗺️ Documentação da API

Toda a documentação dos endpoints da API é gerada automaticamente pelo Swagger.

Após iniciar o servidor do backend localmente, a documentação estará disponível em:
`http://localhost:3000/api`

## 🚀 Como Executar

Este guia assume que você já possui **Git**, **Docker** e **Docker Compose** instalados em sua máquina. Node.js e Yarn também são recomendados se você pretende rodar localmente fora do Docker.

**Observação:** Execute todos os comandos a partir da pasta **raiz** do projeto (`nous-library-app/`) após clonar.

### 1. Clonar o Repositório

```bash
git clone https://github.com/gabrielcostaaa/nous-library-app.git
cd nous-library-app
```
### 2. Instalar Dependências
Instale todas as dependências do backend, frontend e ferramentas do monorepo.
```bash
yarn install
```
### 3. Importar Variáveis de Ambiente
Para fins de praticidade, o .env foi versionado no repositório, apesar da prática comum e segura é se utilizar o .env.example

### 4. Iniciar o Banco de Dados Docker
Suba apenas o contêiner do banco de dados PostgreSQL.
```bash
docker-compose up -d db
```

### 5. Executar as Migrações do Banco
Aplique o schema do Prisma no banco de dados Docker.
```bash
yarn migrate:api
```
(Este comando usará a DATABASE_URL definida no .env para se conectar via localhost:5432). Pode ser necessário confirmar a aplicação da migração no terminal.

### 6. (Opcional) Gerar o Prisma Client
Se você fizer alterações no prisma/schema.prisma, precisará regenerar o cliente Prisma.
```bash
yarn generate:api
```

###  8. Iniciar a Aplicação Completa (API + Frontend)
Suba todos os serviços definidos no docker-compose.yml (API, Frontend Web e o Banco de Dados, se ainda não estiver rodando).
```bash
docker-compose up -d --build
```
--build: Necessário na primeira vez ou se houver alterações nos Dockerfiles.

-d: Roda os contêineres em segundo plano.

###  9. Acessar a Aplicação
Abra seu navegador em ➡️ http://localhost:8080

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
