<?php

namespace App\Models;

class ContactChannel
{
    public function __construct(
        public readonly string $label,
        public readonly string $value,
        public readonly string $href,
        public readonly string $availability,
    ) {
    }
}
