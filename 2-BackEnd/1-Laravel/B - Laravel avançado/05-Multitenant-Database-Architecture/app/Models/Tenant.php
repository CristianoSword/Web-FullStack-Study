<?php

namespace App\Models;

class Tenant
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly string $database,
        public readonly string $region,
        public readonly string $status,
    ) {
    }
}
