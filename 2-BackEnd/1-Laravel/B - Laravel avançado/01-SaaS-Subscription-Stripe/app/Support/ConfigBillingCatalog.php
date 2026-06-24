<?php

namespace App\Support;

use App\Contracts\BillingCatalog;
use App\Models\Plan;

class ConfigBillingCatalog implements BillingCatalog
{
    public function plans(): array
    {
        return array_map(
            static fn (array $plan) => new Plan(
                id: $plan['id'],
                name: $plan['name'],
                headline: $plan['headline'],
                priceInCents: $plan['price_in_cents'],
                interval: $plan['interval'],
                features: $plan['features'],
                highlighted: $plan['highlighted'] ?? false,
            ),
            config('billing.plans', [])
        );
    }
}
