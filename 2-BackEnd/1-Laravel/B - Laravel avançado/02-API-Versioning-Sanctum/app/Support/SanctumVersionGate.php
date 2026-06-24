<?php

namespace App\Support;

use App\Models\ApiConsumer;

class SanctumVersionGate
{
    public function resolveConsumer(?string $token): ?ApiConsumer
    {
        foreach (config('api_versions.tokens', []) as $consumer) {
            if (($consumer['token'] ?? null) !== $token) {
                continue;
            }

            return new ApiConsumer(
                name: $consumer['name'],
                token: $consumer['token'],
                abilities: $consumer['abilities'],
            );
        }

        return null;
    }
}
