<?php
require_once __DIR__ . '/vendor/autoload.php';

use App\Queue;
use App\Worker;

$queue = new Queue(__DIR__ . '/storage');
$worker = new Worker($queue);

// Configurar handler para parada graciosa
pcntl_async_signals(true);
pcntl_signal(SIGINT, function() use ($worker) {
    echo "\nStopping worker...\n";
    $worker->stop();
});

$worker->start();
