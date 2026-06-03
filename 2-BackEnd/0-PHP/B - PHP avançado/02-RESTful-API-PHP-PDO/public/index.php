<?php
// Front controller for RESTful API

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

define('ROOT_DIR', dirname(__DIR__));

// Simple autoloader
spl_autoload_register(function ($class) {
    $file = ROOT_DIR . '/src/' . str_replace('\\', '/', str_replace('App\\', '', $class)) . '.php';
    if (file_exists($file)) require $file;
});

$config = require ROOT_DIR . '/config/db.php';

// Parse URI and method
$uri    = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$parts  = explode('/', $uri);          // e.g. ['api', 'products', '3']
$method = $_SERVER['REQUEST_METHOD'];

// Route: /api/products[/{id}]
if ($parts[0] === 'api' && isset($parts[1]) && $parts[1] === 'products') {
    $id = $parts[2] ?? null;

    require_once ROOT_DIR . '/src/Database.php';
    require_once ROOT_DIR . '/src/ProductRepository.php';
    require_once ROOT_DIR . '/src/ProductController.php';

    $db   = \App\Database::connect($config);
    $repo = new \App\ProductRepository($db);
    $ctrl = new \App\ProductController($repo);

    switch ($method) {
        case 'GET':
            $id ? $ctrl->show((int)$id) : $ctrl->index();
            break;
        case 'POST':
            $ctrl->store();
            break;
        case 'PUT':
            $ctrl->update((int)$id);
            break;
        case 'DELETE':
            $ctrl->destroy((int)$id);
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Route not found']);
}
