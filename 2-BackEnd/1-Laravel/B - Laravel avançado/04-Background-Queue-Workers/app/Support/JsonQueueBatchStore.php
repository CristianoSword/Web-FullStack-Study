<?php

namespace App\Support;

use App\Contracts\QueueBatchStore;
use Illuminate\Support\Facades\File;

class JsonQueueBatchStore implements QueueBatchStore
{
    public function __construct(
        private readonly string $path
    ) {
    }

    public function all(): array
    {
        if (! File::exists($this->path)) {
            return [];
        }

        return json_decode((string) File::get($this->path), true) ?? [];
    }

    public function append(array $batch): void
    {
        $batches = $this->all();
        $batches[] = $batch;

        File::put(
            $this->path,
            json_encode($batches, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
    }
}
