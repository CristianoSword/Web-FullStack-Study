<?php
require_once __DIR__ . '/../vendor/autoload.php';

use App\AuthService;
use App\JWTService;
use App\AuthMiddleware;

$config = require __DIR__ . '/../config/config.php';

header('Content-Type: application/json');

try {
    $dsn = "mysql:host={$config['db']['host']};dbname={$config['db']['dbname']};charset={$config['db']['charset']}";
    $pdo = new PDO($dsn, $config['db']['user'], $config['db']['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $jwtService = new JWTService($config['jwt_secret'], $config['jwt_algo'], $config['jwt_ttl']);
    $authService = new AuthService($pdo, $jwtService);
    $authMiddleware = new AuthMiddleware($authService);

    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    if ($path === '/register' && $method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['name'], $input['email'], $input['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }

        $result = $authService->register($input['name'], $input['email'], $input['password']);
        echo json_encode($result);
    }
    elseif ($path === '/login' && $method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['email'], $input['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing email or password']);
            exit;
        }

        $result = $authService->login($input['email'], $input['password']);
        echo json_encode($result);
    }
    elseif ($path === '/me' && $method === 'GET') {
        $payload = $authMiddleware->requireAuth();

        echo json_encode([
            'message' => 'Protected route accessed successfully',
            'user_id' => $payload['user_id'],
            'email' => $payload['email'],
        ]);
    }
    else {
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }
} catch (\InvalidArgumentException $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
}
