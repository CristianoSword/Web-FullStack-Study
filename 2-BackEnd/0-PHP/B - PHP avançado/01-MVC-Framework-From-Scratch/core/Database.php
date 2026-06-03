<?php

namespace Core;

use PDO;
use PDOException;

class Database
{
    private static ?PDO $instance = null;

    private function __construct() {}

    public static function getConnection(array $config): PDO
    {
        if (self::$instance === null) {
            try {
                $dsn = sprintf(
                    "mysql:host=%s;dbname=%s;charset=%s",
                    $config['host'],
                    $config['dbname'],
                    $config['charset']
                );
                
                $options = [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ];

                self::$instance = new PDO($dsn, $config['user'], $config['pass'], $options);
            } catch (PDOException $e) {
                // In production, log error and show a generic message
                die("Database Connection Error: " . $e->getMessage());
            }
        }

        return self::$instance;
    }
}
