# 🚀 Portfolio API

API REST desenvolvida para gerir o conteúdo do meu portfólio pessoal, incluindo autenticação, utilizadores, projetos, upload de imagens e recuperação de palavra-passe.

---

## ✨ Funcionalidades

### 🔐 Autenticação

- Login com JWT
- Rotas protegidas
- Recuperação de palavra-passe
- Reset de palavra-passe através de token

### 👤 Utilizadores

- Criar utilizador
- Consultar perfil autenticado
- Atualizar perfil
- Eliminar utilizador
- Upload de avatar
- Remover avatar

### 📁 Projetos

- Criar projeto
- Listar projetos
- Consultar projeto por ID
- Atualizar projeto
- Eliminar projeto
- Upload de thumbnail
- Remover thumbnail

### ☁️ Upload de Imagens

- Upload para Cloudinary
- Remoção automática da imagem anterior
- Validação do tipo do ficheiro

### 📧 Serviço de E-mail

- Recuperação de palavra-passe
- Envio através do Nodemailer

### 📚 Documentação

- Swagger UI
- Validação com Zod

---

# 🛠 Tecnologias

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Zod
- JWT
- Cloudinary
- Nodemailer
- Swagger
- Fastify Multipart

---

# 📂 Estrutura do Projeto

```
src
│
├── config
├── errors
├── middlewares
├── modules
│   ├── auth
│   ├── projects
│   ├── upload
│   └── users
│
├── plugins
├── services
└── server.ts
```

---

# ⚙️ Instalação

Clone o projeto.

```bash
git clone https://github.com/tiago3milio/portfolio-backend.git
```

Entre na pasta.

```bash
cd portfolio-api
```

Instale as dependências.

```bash
npm install
```

---

# 🔑 Variáveis de Ambiente

Crie um ficheiro `.env`.

```env
DATABASE_URL=

JWT_SECRET=

MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASSWORD=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# 🗄 Base de Dados

Gerar o Prisma Client.

```bash
npx prisma generate
```

Executar as migrations.

```bash
npx prisma migrate dev
```

---

# ▶️ Executar o Projeto

Modo desenvolvimento.

```bash
npm run dev
```

Produção.

```bash
npm run build

npm start
```

---

# 📖 Documentação

Depois de iniciar o servidor:

```
http://localhost:3000/docs
```

---

# 🔐 Autenticação

Após efetuar login será devolvido um JWT.

```
Authorization

Bearer <token>
```

---

# 📌 Endpoints

## Auth

| Método | Endpoint |
|---------|----------|
| POST | /auth/login |
| POST | /auth/forgot-password |
| POST | /auth/reset-password |

---

## Users

| Método | Endpoint |
|---------|----------|
| POST | /users/new-user |
| GET | /users/me |
| GET | /users/:name |
| PATCH | /users/me |
| DELETE | /users/:id |
| PATCH | /users/avatar |
| DELETE | /users/avatar |

---

## Projects

| Método | Endpoint |
|---------|----------|
| POST | /projects |
| GET | /projects |
| GET | /projects/:id |
| PATCH | /projects/:id |
| DELETE | /projects/:id |
| PATCH | /projects/:id/thumbnail |
| DELETE | /projects/:id/thumbnail |

---

# ☁️ Upload

Os uploads são enviados para o Cloudinary.

Formatos suportados:

- JPG
- PNG
- WEBP

---

# 🛡 Segurança

- JWT Authentication
- Password Hashing
- Rate Limiting
- CORS
- Validação com Zod

---

# 🚀 Próximas Melhorias

- Testes automatizados (Vitest)
- Docker
- CI/CD com GitHub Actions
- Refresh Token
- Cache com Redis
- Logs estruturados
- Paginação
- Pesquisa de projetos

---

# 👨‍💻 Autor

Tiago Santos

LinkedIn:
https://linkedin.com/in/tiago-santos-lk

GitHub:
https://github.com/tiago3milio