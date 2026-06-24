<?php

namespace App\Models;

class BillableCustomer
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly string $company,
        public readonly string $segment,
    ) {
    }
}
