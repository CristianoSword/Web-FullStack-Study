<?php

namespace App\Contracts;

interface UploadIndex
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public function all(): array;

    /**
     * @param array<string, mixed> $record
     */
    public function append(array $record): void;
}
