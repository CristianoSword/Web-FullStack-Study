<?php

namespace App\Support;

use App\Contracts\VersionedCatalog;

class ApiVersionWorkspace
{
    public function __construct(
        private readonly VersionedCatalog $catalog,
        private readonly SanctumVersionGate $gate,
    ) {
    }

    public function resolve(string $version, ?string $token): array
    {
        $consumer = $this->gate->resolveConsumer($token);

        return [
            'authorized' => $consumer !== null,
            'consumer' => $consumer,
            'version' => $version,
            'resources' => $consumer ? $this->catalog->resources($version) : [],
        ];
    }
}
