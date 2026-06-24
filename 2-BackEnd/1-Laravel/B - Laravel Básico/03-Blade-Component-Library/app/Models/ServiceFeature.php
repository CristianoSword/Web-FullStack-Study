<?php

namespace App\Models;

class ServiceFeature
{
    /**
     * @param array<int, string> $bullets
     */
    public function __construct(
        public readonly string $title,
        public readonly string $description,
        public readonly string $highlight,
        public readonly array $bullets,
    ) {
    }
}
