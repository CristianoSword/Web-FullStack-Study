<?php

return [
    'tokens' => [
        [
            'name' => 'Frontend Console',
            'token' => 'demo-token-v1',
            'abilities' => ['catalog:read', 'metrics:read'],
        ],
    ],
    'versions' => [
        'v1' => [
            [
                'id' => 'proj-100',
                'title' => 'Starter workspace',
                'status' => 'active',
                'payload' => [
                    'workspace_limit' => 1,
                    'seat_limit' => 3,
                ],
            ],
        ],
        'v2' => [
            [
                'id' => 'proj-100',
                'title' => 'Starter workspace',
                'status' => 'active',
                'payload' => [
                    'workspace_limit' => 1,
                    'seat_limit' => 3,
                    'feature_flags' => ['billing_portal', 'invoice_history'],
                ],
            ],
        ],
    ],
];
