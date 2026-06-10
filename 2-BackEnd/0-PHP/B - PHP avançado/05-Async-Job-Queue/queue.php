<?php
require_once __DIR__ . '/vendor/autoload.php';

use App\Queue;
use App\Jobs\SendEmailJob;
use App\Jobs\ProcessImageJob;

$queue = new Queue(__DIR__ . '/storage');

// Adicionar jobs de exemplo
$queue->push(new SendEmailJob([
    'to' => 'user@example.com',
    'subject' => 'Bem-vindo!',
    'body' => 'Obrigado por se cadastrar.',
]));

$queue->push(new ProcessImageJob([
    'image_path' => '/path/to/image.jpg',
    'operations' => ['resize', 'compress', 'watermark'],
]));

echo "Jobs adicionados à fila. Total: {$queue->count()}\n";
