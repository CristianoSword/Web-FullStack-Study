<?php

namespace App\Support;

class TenancyWorkspace
{
    public function __construct(
        private readonly ConfigTenantRegistry $registry
    ) {
    }

    public function tenants(): array
    {
        return $this->registry->tenants();
    }

    public function workspaces(): array
    {
        return $this->registry->workspaces();
    }

    public function activeTenant(?string $tenantId = null)
    {
        $tenants = $this->tenants();
        $selectedId = $tenantId ?: $tenants[0]->id;

        foreach ($tenants as $tenant) {
            if ($tenant->id === $selectedId) {
                return $tenant;
            }
        }

        return $tenants[0] ?? null;
    }
}
