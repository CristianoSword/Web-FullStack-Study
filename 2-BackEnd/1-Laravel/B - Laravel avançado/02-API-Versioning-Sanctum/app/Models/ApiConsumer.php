<?php

namespace App\Models;

class ApiConsumer
{
    public function __construct(
        public readonly string $name,
        public readonly string $token,
        public readonly array $abilities,
    ) {
    }
}
