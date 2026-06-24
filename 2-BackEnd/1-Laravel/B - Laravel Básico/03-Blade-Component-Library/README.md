# Blade Component Library - Laravel

Site institucional didatico estruturado com Blade, componentes reutilizaveis e um fluxo simples de captacao de leads.

## Objetivo

Este projeto mostra uma forma organizada de montar paginas institucionais em Laravel sem espalhar conteudo por varias views:

- dados do site centralizados em `config/site.php`
- models simples para representar navegacao, servicos, metricas e depoimentos
- controller unico para paginas institucionais
- componentes Blade reutilizaveis para secoes principais
- formulario com validacao e persistencia local em JSON

## Funcionalidades

- Home com hero section, metricas, servicos e depoimentos
- Pagina de servicos usando a mesma biblioteca de componentes
- Pagina de contato com canais de atendimento
- Formulario com `FormRequest` para validar nome, email, objetivo e mensagem
- Armazenamento local de leads em `storage/app/private/contact-leads.json`

## Estrutura

```text
03-Blade-Component-Library/
├── app/
│   ├── Contracts/
│   │   └── ProvidesInstitutionalContent.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── SiteController.php
│   │   └── Requests/
│   │       └── ContactLeadRequest.php
│   ├── Models/
│   │   ├── ContactChannel.php
│   │   ├── Metric.php
│   │   ├── NavItem.php
│   │   ├── ServiceFeature.php
│   │   └── Testimonial.php
│   ├── Support/
│   │   ├── ConfigInstitutionalContent.php
│   │   └── LeadCaptureStore.php
│   └── View/
│       └── Components/
│           ├── FeatureCard.php
│           ├── HeroSection.php
│           ├── StatCard.php
│           └── TestimonialCard.php
├── config/
│   └── site.php
├── public/
│   └── css/
│       └── site.css
├── resources/
│   └── views/
│       ├── components/
│       ├── layouts/
│       └── pages/
├── routes/
│   └── web.php
└── storage/
    └── app/private/
```

## Rotas

| Metodo | Rota | Acao |
|--------|------|------|
| GET | `/` | Home institucional |
| GET | `/servicos` | Lista de servicos |
| GET | `/contato` | Pagina de contato |
| POST | `/contato` | Envio do formulario |

## Fluxo do formulario

1. O usuario preenche os dados na pagina `/contato`.
2. `ContactLeadRequest` valida e normaliza o payload.
3. `SiteController::submitContact()` delega a persistencia para `LeadCaptureStore`.
4. O lead e salvo em JSON local e o usuario recebe mensagem de sucesso.

## Como usar em um app Laravel

Este projeto foi montado como recorte didatico de codigo-fonte. Para rodar dentro de uma aplicacao Laravel completa:

1. Copie a estrutura para dentro de um projeto Laravel ativo.
2. Garanta que `config/site.php` esteja carregado normalmente pelo framework.
3. Registre as rotas de `routes/web.php`.
4. Publique `public/css/site.css`.
5. Acesse as paginas institucionais e teste o envio do formulario.

## Fases concluidas

- `[01/06] setup`
- `[02/06] types/models`
- `[03/06] core-logic`
- `[04/06] ui/routes`
- `[05/06] validation/fixes`
- `[06/06] docs`
