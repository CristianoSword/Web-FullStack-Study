<?php

namespace App\Support;

use App\Models\QueueBatch;
use App\Models\QueueJobMetric;
use Illuminate\Support\Str;

class QueueLabWorkspace
{
    public function __construct(
        private readonly JsonQueueBatchStore $store
    ) {
    }

    public function batches(): array
    {
        return array_map(
            static fn (array $batch) => new QueueBatch(
                id: $batch['id'],
                campaign: $batch['campaign'],
                jobCount: (int) $batch['job_count'],
                status: $batch['status'],
                queuedAt: $batch['queued_at'],
            ),
            array_reverse($this->store->all())
        );
    }

    public function metrics(): array
    {
        return array_map(
            static fn (array $metric) => new QueueJobMetric(
                name: $metric['name'],
                value: $metric['value'],
                detail: $metric['detail'],
            ),
            config('queue_lab.workers', [])
        );
    }

    public function dispatchBatch(string $campaign, int $jobCount): void
    {
        $this->store->append([
            'id' => (string) Str::uuid(),
            'campaign' => $campaign,
            'job_count' => $jobCount,
            'status' => 'queued',
            'queued_at' => now()->format('d/m H:i'),
        ]);
    }
}
