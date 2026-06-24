<?php

namespace App\Contracts;

interface VersionedCatalog
{
    /**
     * @return array<int, \App\Models\ApiResource>
     */
    public function resources(string $version): array;
}
