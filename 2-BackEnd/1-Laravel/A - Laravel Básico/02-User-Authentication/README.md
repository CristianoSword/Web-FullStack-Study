# User Authentication - Laravel

Sistema de login e registro básico usando Laravel Breeze.

## 🚀 Funcionalidades

- Registro de usuários
- Login com email e senha
- Dashboard protegido
- Logout seguro
- Validação de dados
- Hash de senhas
- Middleware de autenticação

## 📦 Instalação

```bash
composer install
php artisan migrate
```

## 💻 Uso

```bash
php artisan serve
```

Acesse: http://localhost:8000

## 📁 Estrutura

```
02-User-Authentication/
├── app/
│   ├── Models/
│   │   └── User.php
│   └── Http/
│       └── Controllers/
│           └── AuthController.php
├── database/
│   └── migrations/
│       └── create_users_table.php
├── resources/
│   └── views/
│       ├── layout.blade.php
│       └── auth/
│           ├── register.blade.php
│           ├── login.blade.php
│           └── dashboard.blade.php
└── routes/
    └── web.php
```

## 📝 Rotas

| Método | Rota | Middleware | Ação |
|--------|------|------------|-------|
| GET | / | - | Redirect |
| GET | /register | guest | showRegister |
| POST | /register | guest | register |
| GET | /login | guest | showLogin |
| POST | /login | guest | login |
| GET | /dashboard | auth | dashboard |
| POST | /logout | auth | logout |

## 🔒 Segurança

- Senhas hash com bcrypt
- Proteção CSRF
- Regeneração de sessão
- Middleware de autenticação
- Validação de email único
