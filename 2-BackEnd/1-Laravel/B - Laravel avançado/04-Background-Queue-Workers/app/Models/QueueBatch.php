<?php

namespace App\Models;

class QueueBatch
{
    public function __construct(
        public readonly string $id,
        public readonly string $campaign,
        public readonly int $jobCount,
        public readonly string $status,
        public readonly string $queuedAt,
    ) {
    }
}
