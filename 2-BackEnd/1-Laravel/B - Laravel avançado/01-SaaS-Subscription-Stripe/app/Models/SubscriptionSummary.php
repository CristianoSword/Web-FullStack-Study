<?php

namespace App\Models;

class SubscriptionSummary
{
    public function __construct(
        public readonly string $planId,
        public readonly string $status,
        public readonly string $renewalDate,
        public readonly bool $hasTrial,
    ) {
    }
}
