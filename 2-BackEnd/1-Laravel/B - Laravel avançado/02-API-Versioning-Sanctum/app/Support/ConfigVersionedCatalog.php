<?php

namespace App\Support;

use App\Contracts\VersionedCatalog;
use App\Models\ApiResource;

class ConfigVersionedCatalog implements VersionedCatalog
{
    public function resources(string $version): array
    {
        return array_map(
            static fn (array $resource) => new ApiResource(
                id: $resource['id'],
                title: $resource['title'],
                status: $resource['status'],
                payload: $resource['payload'],
            ),
            config('api_versions.versions.' . $version, [])
        );
    }
}
