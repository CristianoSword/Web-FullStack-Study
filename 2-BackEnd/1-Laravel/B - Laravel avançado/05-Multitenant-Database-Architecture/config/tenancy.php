<?php

return [
    'tenants' => [
        [
            'id' => 'aurora-co',
            'name' => 'Aurora Co',
            'database' => 'tenant_aurora',
            'region' => 'sa-east-1',
            'status' => 'healthy',
        ],
        [
            'id' => 'atlas-finance',
            'name' => 'Atlas Finance',
            'database' => 'tenant_atlas',
            'region' => 'us-east-1',
            'status' => 'provisioning',
        ],
        [
            'id' => 'nebula-care',
            'name' => 'Nebula Care',
            'database' => 'tenant_nebula',
            'region' => 'eu-west-1',
            'status' => 'healthy',
        ],
    ],
    'workspaces' => [
        [
            'slug' => 'marketing',
            'owner' => 'Camila',
            'environment' => 'production',
        ],
        [
            'slug' => 'operations',
            'owner' => 'Rafael',
            'environment' => 'staging',
        ],
    ],
];
