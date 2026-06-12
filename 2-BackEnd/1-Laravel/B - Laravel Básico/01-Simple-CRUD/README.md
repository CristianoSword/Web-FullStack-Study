# Simple CRUD - Laravel

CRUD básico de postagens de blog com Laravel.

## 🚀 Funcionalidades

- Criar, ler, atualizar e deletar posts
- Validação de dados
- Views Blade com layout
- Rotas REST
- Model Eloquent
- Migrations

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
01-Simple-CRUD/
├── app/
│   ├── Models/
│   │   └── Post.php
│   └── Http/
│       └── Controllers/
│           └── PostController.php
├── database/
│   └── migrations/
│       └── create_posts_table.php
├── resources/
│   └── views/
│       ├── layout.blade.php
│       └── posts/
│           ├── index.blade.php
│           ├── create.blade.php
│           ├── show.blade.php
│           └── edit.blade.php
└── routes/
    └── web.php
```

## 📝 Rotas

| Método | Rota | Ação |
|--------|------|-------|
| GET | / | Redirect |
| GET | /posts | index |
| GET | /posts/create | create |
| POST | /posts | store |
| GET | /posts/{id} | show |
| GET | /posts/{id}/edit | edit |
| PUT/PATCH | /posts/{id} | update |
| DELETE | /posts/{id} | destroy |
