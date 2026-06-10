<?php
namespace App;

class User
{
    public function __construct(
        public readonly int    $id,
        public readonly string $name,
        public readonly string $email,
        public readonly string $password,
    ) {}

    public static function fromArray(array $row): self
    {
        return new self(
            id:       (int)$row['id'],
            name:     $row['name'],
            email:    $row['email'],
            password: $row['password'],
        );
    }

    public function toPublicArray(): array
    {
        return ['id' => $this->id, 'name' => $this->name, 'email' => $this->email];
    }
}
