<?php

return [
    'plans' => [
        [
            'id' => 'starter',
            'name' => 'Starter',
            'headline' => 'Para equipes validando canal de assinatura.',
            'price_in_cents' => 9900,
            'interval' => 'mes',
            'highlighted' => false,
            'features' => [
                'Ate 3 usuarios internos',
                'Checkout recorrente simplificado',
                'Dashboard com status da assinatura',
            ],
        ],
        [
            'id' => 'growth',
            'name' => 'Growth',
            'headline' => 'Para times que precisam automatizar cobranca e upgrade.',
            'price_in_cents' => 24900,
            'interval' => 'mes',
            'highlighted' => true,
            'features' => [
                'Usuarios ilimitados',
                'Trial de 14 dias',
                'Webhooks de renovacao e inadimplencia',
            ],
        ],
        [
            'id' => 'scale',
            'name' => 'Scale',
            'headline' => 'Operacao com multiplos workspaces e governanca de billing.',
            'price_in_cents' => 59900,
            'interval' => 'mes',
            'highlighted' => false,
            'features' => [
                'Multi-tenant por workspace',
                'Gestao de invoices e creditos',
                'Segmentacao por conta enterprise',
            ],
        ],
    ],
];
