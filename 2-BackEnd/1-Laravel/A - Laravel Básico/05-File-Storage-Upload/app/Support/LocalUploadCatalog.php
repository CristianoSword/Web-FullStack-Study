<?php

namespace App\Support;

use App\Contracts\UploadIndex;
use App\Models\FileCategory;
use App\Models\StoredUpload;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LocalUploadCatalog
{
    public function __construct(
        private readonly UploadIndex $index
    ) {
    }

    /**
     * @return array<int, FileCategory>
     */
    public function categories(): array
    {
        return array_map(
            static fn (array $category) => new FileCategory(
                key: $category['key'],
                label: $category['label'],
                description: $category['description'],
            ),
            config('files.categories', [])
        );
    }

    /**
     * @return array<int, StoredUpload>
     */
    public function list(): array
    {
        return array_map(
            static fn (array $record) => new StoredUpload(
                id: $record['id'],
                originalName: $record['original_name'],
                storedName: $record['stored_name'],
                category: $record['category'],
                mimeType: $record['mime_type'],
                size: (int) $record['size'],
                uploadedBy: $record['uploaded_by'],
                storedAt: $record['stored_at'],
            ),
            array_reverse($this->index->all())
        );
    }

    public function find(string $id): ?StoredUpload
    {
        foreach ($this->index->all() as $record) {
            if (($record['id'] ?? null) !== $id) {
                continue;
            }

            return new StoredUpload(
                id: $record['id'],
                originalName: $record['original_name'],
                storedName: $record['stored_name'],
                category: $record['category'],
                mimeType: $record['mime_type'],
                size: (int) $record['size'],
                uploadedBy: $record['uploaded_by'],
                storedAt: $record['stored_at'],
            );
        }

        return null;
    }

    public function store(UploadedFile $file, string $category, string $uploadedBy): StoredUpload
    {
        $id = (string) Str::uuid();
        $extension = $file->getClientOriginalExtension();
        $storedName = $id . ($extension ? '.' . strtolower($extension) : '');
        $relativePath = 'private/uploads/' . $storedName;

        Storage::disk('local')->putFileAs('private/uploads', $file, $storedName);

        $record = [
            'id' => $id,
            'original_name' => $file->getClientOriginalName(),
            'stored_name' => $storedName,
            'path' => $relativePath,
            'category' => $category,
            'mime_type' => $file->getMimeType() ?? 'application/octet-stream',
            'size' => $file->getSize() ?: 0,
            'uploaded_by' => $uploadedBy,
            'stored_at' => now()->toIso8601String(),
        ];

        $this->index->append($record);

        return new StoredUpload(
            id: $record['id'],
            originalName: $record['original_name'],
            storedName: $record['stored_name'],
            category: $record['category'],
            mimeType: $record['mime_type'],
            size: (int) $record['size'],
            uploadedBy: $record['uploaded_by'],
            storedAt: $record['stored_at'],
        );
    }
}
