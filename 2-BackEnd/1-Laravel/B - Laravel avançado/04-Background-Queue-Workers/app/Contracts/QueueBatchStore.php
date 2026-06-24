<?php

namespace App\Contracts;

interface QueueBatchStore
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public function all(): array;
}
