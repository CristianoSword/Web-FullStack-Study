<?php

namespace App\Models;

class FileCategory
{
    public function __construct(
        public readonly string $key,
        public readonly string $label,
        public readonly string $description,
    ) {
    }
}
