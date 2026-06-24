<?php

namespace App\Models;

class Testimonial
{
    public function __construct(
        public readonly string $quote,
        public readonly string $author,
        public readonly string $role,
    ) {
    }
}
