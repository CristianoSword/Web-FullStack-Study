<?php

namespace App\Support;

use App\Contracts\TenantRegistry;
use App\Models\Tenant;
use App\Models\TenantWorkspace;

class ConfigTenantRegistry implements TenantRegistry
{
    public function tenants(): array
    {
        return array_map(
            static fn (array $tenant) => new Tenant(
                id: $tenant['id'],
                name: $tenant['name'],
                database: $tenant['database'],
                region: $tenant['region'],
                status: $tenant['status'],
            ),
            config('tenancy.tenants', [])
        );
    }

    public function workspaces(): array
    {
        return array_map(
            static fn (array $workspace) => new TenantWorkspace(
                slug: $workspace['slug'],
                owner: $workspace['owner'],
                environment: $workspace['environment'],
            ),
            config('tenancy.workspaces', [])
        );
    }
}
