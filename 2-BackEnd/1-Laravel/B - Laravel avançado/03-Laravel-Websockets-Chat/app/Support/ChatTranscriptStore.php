<?php

namespace App\Support;

use Illuminate\Support\Facades\File;

class ChatTranscriptStore
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

    public function append(array $message): void
    {
        $messages = $this->all();
        $messages[] = $message;

        File::put(
            $this->path,
            json_encode($messages, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
    }
}
