<?php

namespace App\Models;

class Plan
{
    /**
     * @param array<int, string> $features
     */
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly string $headline,
        public readonly int $priceInCents,
        public readonly string $interval,
        public readonly array $features,
        public readonly bool $highlighted = false,
    ) {
    }
}
