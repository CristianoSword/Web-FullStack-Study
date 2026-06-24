<?php

namespace App\Models;

class QueueJobMetric
{
    public function __construct(
        public readonly string $name,
        public readonly string $value,
        public readonly string $detail,
    ) {
    }
}
