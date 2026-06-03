<?php
namespace App;

use PDO;

class ProductRepository
{
    public function __construct(private PDO $db) {}

    public function findAll(): array
    {
        $stmt = $this->db->query("SELECT * FROM products ORDER BY id DESC");
        return array_map(fn($r) => Product::fromArray($r), $stmt->fetchAll());
    }

    public function findById(int $id): ?Product
    {
        $stmt = $this->db->prepare("SELECT * FROM products WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        return $row ? Product::fromArray($row) : null;
    }

    public function create(array $data): Product
    {
        $stmt = $this->db->prepare(
            "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)"
        );
        $stmt->execute([
            $data['name'],
            $data['description'] ?? '',
            (float)$data['price'],
            (int)($data['stock'] ?? 0),
        ]);
        return $this->findById((int)$this->db->lastInsertId());
    }

    public function update(int $id, array $data): ?Product
    {
        $stmt = $this->db->prepare(
            "UPDATE products SET name=?, description=?, price=?, stock=? WHERE id=?"
        );
        $stmt->execute([
            $data['name'],
            $data['description'] ?? '',
            (float)$data['price'],
            (int)($data['stock'] ?? 0),
            $id,
        ]);
        return $stmt->rowCount() ? $this->findById($id) : null;
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare("DELETE FROM products WHERE id = ?");
        $stmt->execute([$id]);
        return (bool)$stmt->rowCount();
    }
}
