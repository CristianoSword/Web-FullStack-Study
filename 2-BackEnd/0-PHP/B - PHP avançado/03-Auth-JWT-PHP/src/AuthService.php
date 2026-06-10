<?php
namespace App;

use PDO;

class AuthService
{
    private UserRepository $userRepository;
    private JWTService $jwtService;

    public function __construct(PDO $db, JWTService $jwtService)
    {
        $this->userRepository = new UserRepository($db);
        $this->jwtService = $jwtService;
    }

    public function register(string $name, string $email, string $password): array
    {
        if ($this->userRepository->findByEmail($email)) {
            throw new \InvalidArgumentException('Email already registered');
        }

        if (strlen($password) < 6) {
            throw new \InvalidArgumentException('Password must be at least 6 characters');
        }

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $user = $this->userRepository->create($name, $email, $hashedPassword);

        $token = $this->jwtService->encode(['user_id' => $user->id, 'email' => $user->email]);

        return [
            'token' => $token,
            'user' => $user->toPublicArray(),
        ];
    }

    public function login(string $email, string $password): array
    {
        $user = $this->userRepository->findByEmail($email);

        if (!$user) {
            throw new \InvalidArgumentException('Invalid credentials');
        }

        if (!password_verify($password, $user->password)) {
            throw new \InvalidArgumentException('Invalid credentials');
        }

        $token = $this->jwtService->encode(['user_id' => $user->id, 'email' => $user->email]);

        return [
            'token' => $token,
            'user' => $user->toPublicArray(),
        ];
    }

    public function validateToken(string $token): ?array
    {
        $payload = $this->jwtService->decode($token);

        if (!$payload || !isset($payload['user_id'])) {
            return null;
        }

        return $payload;
    }
}
