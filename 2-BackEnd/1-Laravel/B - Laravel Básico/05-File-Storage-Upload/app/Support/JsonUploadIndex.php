<?php

namespace App\Support;

use App\Contracts\UploadIndex;
use Illuminate\Support\Facades\File;

class JsonUploadIndex implements UploadIndex
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

    public function append(array $record): void
    {
        $directory = dirname($this->path);

        if (! File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        $records = $this->all();
        $records[] = $record;

        File::put(
            $this->path,
            json_encode($records, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
    }
}
