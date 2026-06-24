<?php

namespace App\Support;

use App\Contracts\BillingCatalog;
use App\Models\BillableCustomer;
use App\Models\Plan;
use App\Models\SubscriptionSummary;

class SaaSBillingWorkspace
{
    public function __construct(
        private readonly BillingCatalog $catalog
    ) {
    }

    /**
     * @return array<int, Plan>
     */
    public function plans(): array
    {
        return $this->catalog->plans();
    }

    public function sampleCustomer(): BillableCustomer
    {
        return new BillableCustomer(
            name: 'Larissa Monteiro',
            email: 'larissa@nebulaops.test',
            company: 'Nebula Ops',
            segment: 'SaaS B2B'
        );
    }

    public function currentSubscription(): SubscriptionSummary
    {
        return new SubscriptionSummary(
            planId: 'growth',
            status: 'active',
            renewalDate: now()->addDays(23)->format('d/m/Y'),
            hasTrial: true
        );
    }

    public function selectedPlan(?string $planId = null): ?Plan
    {
        $plans = $this->plans();
        $selectedId = $planId ?: $this->currentSubscription()->planId;

        foreach ($plans as $plan) {
            if ($plan->id === $selectedId) {
                return $plan;
            }
        }

        return null;
    }
}
