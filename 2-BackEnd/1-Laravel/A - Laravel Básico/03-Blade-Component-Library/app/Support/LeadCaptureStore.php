<?php

namespace App\Support;

use Illuminate\Support\Facades\File;

class LeadCaptureStore
{
    public function __construct(
        private readonly string $path
    ) {
    }

    /**
     * @param array<string, mixed> $lead
     */
    public function append(array $lead): void
    {
        $directory = dirname($this->path);

        if (! File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        $currentPayload = File::exists($this->path)
            ? json_decode((string) File::get($this->path), true)
            : [];

        $currentPayload[] = $lead;

        File::put(
            $this->path,
            json_encode($currentPayload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
    }
}
