<?php

return [
    'max_upload_kb' => 2048,
    'allowed_mimes' => [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    'categories' => [
        [
            'key' => 'contracts',
            'label' => 'Contratos',
            'description' => 'Documentos formais de proposta e assinatura.',
        ],
        [
            'key' => 'assets',
            'label' => 'Assets',
            'description' => 'Imagens e arquivos de apoio para paginas e campanhas.',
        ],
        [
            'key' => 'reports',
            'label' => 'Relatorios',
            'description' => 'Materiais internos ou entregas recorrentes para clientes.',
        ],
    ],
];
