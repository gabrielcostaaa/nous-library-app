<p align="center">
  <img src="images/banner.png" alt="Banner Nous Library App" width="100%">
</p>

<h1 align="center">Nous Library App</h1>

<p align="center">
  <em>"A biblioteca como o ato sereno de contemplar a essência"</em>
</p>

<p align="center">
  <img alt="Status do Projeto" src="https://img.shields.io/badge/status-em_desenvolvimento-yellow">
  <img alt="Linguagem Principal" src="https://img.shields.io/badge/typescript-%233178C6.svg?style=flat&logo=typescript&logoColor=white">
  <img alt="Framework Backend" src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=flat&logo=nestjs&logoColor=white">
  <img alt="Framework Frontend" src="https://img.shields.io/badge/next.js-000000?style=flat&logo=nextdotjs&logoColor=white">
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
- [🗺️ Endpoints da API](#-endpoints-da-api)
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
| 🔵 **Azul Egeu** | `#2B3A67` <img src="https://via.placeholder.com/15/2B3A67/000000?text=+" alt="Azul Egeu"> | Cor primária (ações, links, títulos) |
| ⚪ **Mármore** | `#F5F5F3` <img src="https://via.placeholder.com/15/F5F5F3/000000?text=+" alt="Mármore"> | Fundo principal da aplicação |
| ⚫ **Pedra Escura** | `#333333` <img src="https://via.placeholder.com/15/333333/000000?text=+" alt="Pedra Escura"> | Texto principal (corpo) |
| 🔘 **Pedra Clara** | `#E0E0E0` <img src="https://via.placeholder.com/15/E0E0E0/000000?text=+" alt="Pedra Clara"> | Divisores, bordas, fundos secundários |
| 🟡 **Ouro Antigo** | `#B8860B` <img src="https://via.placeholder.com/15/B8860B/000000?text=+" alt="Ouro Antigo"> | Destaques sutis, ícones especiais |
| 🟢 **Oliva** | `#6B8E23` <img src="https://via.placeholder.com/15/6B8E23/000000?text=+" alt="Oliva"> | Mensagens de sucesso |
| 🔴 **Terracota** | `#B24C42` <img src="https://via.placeholder.com/15/B24C42/000000?text=+" alt="Terracota"> | Mensagens de erro e alerta (atrasos) |

### Tipografia

- **Títulos (Headings):** [Lora](https://fonts.google.com/specimen/Lora)  
  Uma fonte serifada elegante e "livresca", trazendo a seriedade acadêmica.
- **Corpo & UI (Body):** [Inter](https://fonts.google.com/specimen/Inter)  
  Uma fonte sans-serif moderna, otimizada para legibilidade máxima em interfaces (tabelas, botões, formulários).

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Justificativa |
| :--- | :--- | :--- |
| **Backend** | **NestJS (Node.js)** | Framework Typescript que força uma arquitetura modular (SRP) e organizada. |
|  | **Prisma** | ORM moderno com alta type-safety, ideal para a integração com NestJS. |
|  | **JWT + Bcrypt** | Padrão de indústria para autenticação segura e hashing de senhas. |
|  | `class-validator` | Validação de DTOs (Data Transfer Objects) na entrada da API. |
| **Frontend** | **Next.js (React)** | Framework robusto para construção de interfaces, com excelente roteamento. |
|  | **Typescript** | Garante consistência e segurança de tipos de ponta a ponta. |
|  | **Tailwind CSS** | (Sugestão) Utilitário CSS para prototipação rápida e consistente. |
|  | **Axios** | Cliente HTTP para comunicação segura com a API. |
| **Banco de Dados** | **PostgreSQL** | Banco de dados relacional robusto e escalável. |
| (Bônus) | **Redis** | (Opcional) Pode ser usado para cache ou blacklist de tokens JWT (logout). |

## 🏛️ Arquitetura

O projeto segue os princípios de **Código Limpo**, **Modularidade** e **Separação de Responsabilidades (SoC)**.

### Banco de Dados (Prisma Schema)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Enum para os papéis de usuário
enum Role {
  ADMIN // Administrador
  USER  // Usuário comum (para empréstimos)
}

model User {
  id       String   @id @default(uuid())
  email    String   @unique
  password String
  name     String
  role     Role     @default(USER)
  loans    Loan[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Book {
  id        String   @id @default(uuid())
  title     String
  author    String
  basePrice Float
  loans     Loan[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Loan {
  id         String    @id @default(uuid())
  loanDate   DateTime  @default(now())
  dueDate    DateTime
  returnDate DateTime?

  user   User   @relation(fields: [userId], references: [id])
  userId String
  book   Book   @relation(fields: [bookId], references: [id])
  bookId String

  fineDiscountApplied Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
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

## 🗺️ Endpoints da API

### A. Autenticação e Usuários (Admin)

* `POST /admin/login`
  **Descrição:** Login do Admin. Retorna um Token JWT.
  **Input:** `{"email": "...", "senha": "..."}`

* `POST /admin/users`
  **Descrição:** Criar novo usuário Admin.
  **Regra:** Rota protegida (Requer JWT de Admin).

### B. Usuários (Comum)

* `POST /users`
  **Descrição:** Criar usuário comum (para empréstimos).
  **Regra:** Endpoint público.

### C. Empréstimos e Cálculos

* `POST /loans`
  **Descrição:** Registrar um novo empréstimo.
  **Input:** `{"user_id": "...", "book_id": "...", "data_prazo_devolucao": "..."}`
  **Regra:** Rota protegida (Admin).

* `GET /loans/{id}/fine`
  **Descrição:** Calcular a multa de um empréstimo específico.
  **Output:** `{"multa": 10.00}`

* `GET /loans/{id}/rental`
  **Descrição:** Calcular o valor total do aluguel.
  **Output:** `{"aluguel": 15.00}`

*(Nota: Endpoints de CRUD para Livros e listagem de Usuários/Empréstimos também serão implementados para suportar as telas do frontend).*

## 🚀 Como Executar

Siga os passos abaixo para executar o projeto localmente. (Assumindo duas pastas separadas: `backend` e `frontend`).

### Backend (API NestJS)

```bash
git clone https://github.com/seu-usuario/nous-library-backend.git
cd nous-library-backend
npm install
```

Crie e configure o arquivo `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nouslibrary"
JWT_SECRET="seu-segredo-super-secreto"
```

Rode as migrações e inicie o servidor:

```bash
npx prisma migrate dev
npm run start:dev
```

A API estará rodando em:
➡️ `http://localhost:3001`

### Frontend (Dashboard Next.js)

```bash
git clone https://github.com/seu-usuario/nous-library-frontend.git
cd nous-library-frontend
npm install
```

Crie o arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

Inicie o servidor:

```bash
npm run dev
```

O App estará rodando em:
➡️ `http://localhost:3000`

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```

---

✅ **Pronto para uso:** basta copiar e colar no seu `README.md`.  
O layout, os ícones, a tabela de cores e os badges funcionam perfeitamente no GitHub.
```
