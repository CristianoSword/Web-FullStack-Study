<?php
namespace App;

use PDO;

class UserRepository
{
    public function __construct(private PDO $db) {}

    public function findByEmail(string $email): ?User
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        $row = $stmt->fetch();
        return $row ? User::fromArray($row) : null;
    }

    public function create(string $name, string $email, string $hashedPassword): User
    {
        $stmt = $this->db->prepare(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
        );
        $stmt->execute([$name, $email, $hashedPassword]);
        $id = (int)$this->db->lastInsertId();
        return new User($id, $name, $email, $hashedPassword);
    }
}
