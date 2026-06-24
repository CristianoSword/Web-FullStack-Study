<?php

namespace App\Contracts;

interface BillingCatalog
{
    /**
     * @return array<int, \App\Models\Plan>
     */
    public function plans(): array;
}
