<?php

namespace App\Models;

class StoredUpload
{
    public function __construct(
        public readonly string $id,
        public readonly string $originalName,
        public readonly string $storedName,
        public readonly string $category,
        public readonly string $mimeType,
        public readonly int $size,
        public readonly string $uploadedBy,
        public readonly string $storedAt,
    ) {
    }
}
