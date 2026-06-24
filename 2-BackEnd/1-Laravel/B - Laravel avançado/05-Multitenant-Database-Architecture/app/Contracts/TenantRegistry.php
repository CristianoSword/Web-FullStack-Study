<?php

namespace App\Contracts;

interface TenantRegistry
{
    /**
     * @return array<int, \App\Models\Tenant>
     */
    public function tenants(): array;
}
