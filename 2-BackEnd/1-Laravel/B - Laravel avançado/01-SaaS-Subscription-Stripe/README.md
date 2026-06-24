# SaaS Subscription Stripe - Laravel

Projeto didatico que simula uma plataforma SaaS com catalogo de planos, checkout recorrente e dashboard de assinatura inspirado em Stripe Billing e Laravel Cashier.

## Objetivo

Modelar os blocos principais de um fluxo de billing recorrente:

- catalogo de planos
- cliente billable
- resumo de assinatura
- dashboard de renovacao
- checkout validado por plano e email corporativo

## Funcionalidades

- Landing de planos com diferencas de oferta
- Dashboard resumindo conta atual e renovacao
- Checkout simulado por `POST /checkout`
- Validacao de plano e email permitido
- Base de configuracao em `config/billing.php`

## Estrutura

```text
01-SaaS-Subscription-Stripe/
├── app/
│   ├── Contracts/
│   │   └── BillingCatalog.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── BillingController.php
│   │   └── Requests/
│   │       └── CheckoutRequest.php
│   ├── Models/
│   │   ├── BillableCustomer.php
│   │   ├── Plan.php
│   │   └── SubscriptionSummary.php
│   └── Support/
│       ├── ConfigBillingCatalog.php
│       └── SaaSBillingWorkspace.php
├── config/
│   └── billing.php
├── public/css/site.css
├── resources/views/
│   ├── layouts/app.blade.php
│   └── pages/
│       ├── dashboard.blade.php
│       └── pricing.blade.php
└── routes/web.php
```

## Rotas

| Metodo | Rota | Acao |
|--------|------|------|
| GET | `/` | Tabela de planos |
| GET | `/dashboard` | Resumo de billing |
| POST | `/checkout` | Checkout simulado |

## Como evoluir para Stripe real

1. Substituir `SaaSBillingWorkspace` por servicos integrados ao Cashier.
2. Persistir clientes e subscriptions em banco.
3. Criar checkout session real no Stripe.
4. Processar webhooks de pagamento, renovacao e falha.
5. Adicionar portal de faturas e troca de plano.

## Fases concluidas

- `[01/06] setup`
- `[02/06] types/models`
- `[03/06] core-logic`
- `[04/06] ui/routes`
- `[05/06] validation/fixes`
- `[06/06] docs`
