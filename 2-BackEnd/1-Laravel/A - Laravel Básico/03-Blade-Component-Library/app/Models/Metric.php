<?php

namespace App\Models;

class Metric
{
    public function __construct(
        public readonly string $value,
        public readonly string $label,
        public readonly string $description,
    ) {
    }
}
