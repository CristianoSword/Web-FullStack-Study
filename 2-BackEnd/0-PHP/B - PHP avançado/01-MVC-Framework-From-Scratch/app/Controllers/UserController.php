<?php

namespace App\Controllers;

use Core\Controller;
use Core\Request;
use Core\Response;
use App\Models\User;

class UserController extends Controller
{
    public function home(Request $request, Response $response): void
    {
        $params = [
            'name' => 'Fullstack Student'
        ];
        $this->render('home', $params);
    }

    public function index(Request $request, Response $response): void
    {
        // For demonstration, let's return some mock users since DB might not be configured
        $userModel = new User();
        
        try {
            $users = $userModel->all();
        } catch (\PDOException $e) {
            // Fallback to mock data if DB isn't running
            $users = [
                ['id' => 1, 'name' => 'Alice', 'email' => 'alice@example.com'],
                ['id' => 2, 'name' => 'Bob', 'email' => 'bob@example.com'],
                ['id' => 3, 'name' => 'Charlie', 'email' => 'charlie@example.com'],
            ];
        }

        $this->render('users', ['users' => $users]);
    }

    public function apiUsers(Request $request, Response $response): void
    {
        $users = [
            ['id' => 1, 'name' => 'Alice', 'email' => 'alice@example.com'],
            ['id' => 2, 'name' => 'Bob', 'email' => 'bob@example.com']
        ];
        $response->json($users);
    }
}
