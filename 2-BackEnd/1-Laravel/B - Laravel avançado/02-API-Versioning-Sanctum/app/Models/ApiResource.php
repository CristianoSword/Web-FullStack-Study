<?php

namespace App\Models;

class ApiResource
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly string $status,
        public readonly array $payload,
    ) {
    }
}
