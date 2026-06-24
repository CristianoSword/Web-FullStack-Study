<?php

namespace App\Models;

class TenantWorkspace
{
    public function __construct(
        public readonly string $slug,
        public readonly string $owner,
        public readonly string $environment,
    ) {
    }
}
