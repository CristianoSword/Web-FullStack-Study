-- Create database
CREATE DATABASE IF NOT EXISTS api_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE api_db;

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(120) NOT NULL,
    description TEXT,
    price       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    stock       INT NOT NULL DEFAULT 0,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Seed data
INSERT INTO products (name, description, price, stock) VALUES
('Notebook Gamer',  'Core i7, RTX 4060, 16GB RAM', 5999.99, 10),
('Mouse Wireless',  'Ergonomic, DPI 1600',          89.90,   50),
('Mechanical Keyboard', 'RGB, Blue switches',       349.00,  30);
