<?php

namespace App\Models;

class NavItem
{
    public function __construct(
        public readonly string $label,
        public readonly string $routeName,
        public readonly string $href,
        public readonly bool $primary = false,
    ) {
    }
}
