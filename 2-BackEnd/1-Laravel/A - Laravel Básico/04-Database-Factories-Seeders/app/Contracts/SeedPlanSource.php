<?php

namespace App\Contracts;

interface SeedPlanSource
{
    /**
     * @return array<string, mixed>
     */
    public function defaults(): array;
}
