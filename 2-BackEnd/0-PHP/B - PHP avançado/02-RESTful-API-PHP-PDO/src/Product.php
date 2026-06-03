<?php
namespace App;

class Product
{
    public function __construct(
        public readonly int    $id,
        public readonly string $name,
        public readonly string $description,
        public readonly float  $price,
        public readonly int    $stock,
        public readonly string $created_at = '',
        public readonly string $updated_at = '',
    ) {}

    public function toArray(): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'description' => $this->description,
            'price'       => $this->price,
            'stock'       => $this->stock,
            'created_at'  => $this->created_at,
            'updated_at'  => $this->updated_at,
        ];
    }

    public static function fromArray(array $row): self
    {
        return new self(
            id:          (int)$row['id'],
            name:        $row['name'],
            description: $row['description'] ?? '',
            price:       (float)$row['price'],
            stock:       (int)$row['stock'],
            created_at:  $row['created_at'] ?? '',
            updated_at:  $row['updated_at'] ?? '',
        );
    }
}
