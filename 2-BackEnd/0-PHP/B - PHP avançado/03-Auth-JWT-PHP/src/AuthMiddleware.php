<?php
namespace App;

class AuthMiddleware
{
    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function authenticate(): ?array
    {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

        if (!preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            return null;
        }

        $token = $matches[1];
        return $this->authService->validateToken($token);
    }

    public function requireAuth(): array
    {
        $payload = $this->authenticate();

        if (!$payload) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized - Invalid or missing token']);
            exit;
        }

        return $payload;
    }
}
