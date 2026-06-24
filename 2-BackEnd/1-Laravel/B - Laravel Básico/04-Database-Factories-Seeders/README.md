# Database Factories & Seeders - Laravel

Projeto didatico para estudar como organizar models, factories, seeders e um preview configuravel do plano de popular banco em Laravel.

## Objetivo

Mostrar uma estrutura clara para gerar dados consistentes de blog editorial usando factories com estados e seeders com relacoes reais entre entidades.

## O que o projeto cobre

- Models de `Author`, `Category`, `Post` e `Comment`
- `Factory` para cada entidade
- Seeder principal que cria autores, categorias, posts publicados e comentarios
- Plano de seed centralizado em `config/seeding.php`
- Preview web do volume de dados e dos estados disponiveis
- Validacao de parametros de preview por query string

## Estrutura

```text
04-Database-Factories-Seeders/
├── app/
│   ├── Contracts/
│   │   └── SeedPlanSource.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── SeedPreviewController.php
│   │   └── Requests/
│   │       └── SeedPreviewRequest.php
│   ├── Models/
│   │   ├── Author.php
│   │   ├── Category.php
│   │   ├── Comment.php
│   │   └── Post.php
│   └── Support/
│       └── BlogSeedPlan.php
├── config/
│   └── seeding.php
├── database/
│   ├── factories/
│   │   ├── AuthorFactory.php
│   │   ├── CategoryFactory.php
│   │   ├── CommentFactory.php
│   │   └── PostFactory.php
│   └── seeders/
│       ├── BlogShowcaseSeeder.php
│       └── DatabaseSeeder.php
├── public/css/site.css
├── resources/views/
│   ├── layouts/app.blade.php
│   └── pages/seed-preview.blade.php
└── routes/web.php
```

## Fluxo de seed

1. `config/seeding.php` define contagens base e listas de estados.
2. `BlogSeedPlan` resolve os defaults e aplica overrides seguros.
3. `BlogShowcaseSeeder` cria autores e categorias.
4. `PostFactory` gera posts com status e leitura estimada.
5. Cada post recebe comentarios variando dentro da faixa configurada.

## Preview web

A rota principal exibe um painel com:

- quantidade de autores, categorias e posts
- faixa de comentarios por post
- lista de roles, status e paleta de categorias
- formulario para testar overrides como `authors`, `posts` e janela de comentarios

Exemplo:

```text
/?authors=12&posts=48&comments_min=2&comments_max=8
```

## Como usar em um app Laravel real

1. Copie os arquivos para uma aplicacao Laravel completa.
2. Ajuste ou crie as migrations correspondentes aos models.
3. Rode `composer dump-autoload`.
4. Execute `php artisan db:seed --class=BlogShowcaseSeeder`.
5. Acesse a rota web para conferir o plano de seed.

## Fases concluidas

- `[01/06] setup`
- `[02/06] types/models`
- `[03/06] core-logic`
- `[04/06] ui/routes`
- `[05/06] validation/fixes`
- `[06/06] docs`
