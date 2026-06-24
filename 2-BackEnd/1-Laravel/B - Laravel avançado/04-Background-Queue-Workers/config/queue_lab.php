<?php

return [
    'workers' => [
        [
            'name' => 'emails-high',
            'value' => '24 jobs/min',
            'detail' => 'Fila prioritaria para notificacoes transacionais.',
        ],
        [
            'name' => 'emails-bulk',
            'value' => '180 jobs/min',
            'detail' => 'Fila de lotes de campanha e resumo diario.',
        ],
        [
            'name' => 'retry-window',
            'value' => '3 tentativas',
            'detail' => 'Reenvio antes de marcar job como failed.',
        ],
    ],
];
