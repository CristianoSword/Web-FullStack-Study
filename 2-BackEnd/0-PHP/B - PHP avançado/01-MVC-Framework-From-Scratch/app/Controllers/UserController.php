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
        $userModel = new User();

        try {
            $users = $userModel->all();
            $error = null;
        } catch (\PDOException $e) {
            $users = [];
            $error = 'Database unavailable. Configure PDO access to list users.';
        }

        $this->render('users', [
            'users' => $users,
            'error' => $error
        ]);
    }

    public function apiUsers(Request $request, Response $response): void
    {
        $userModel = new User();

        try {
            $response->json($userModel->all());
        } catch (\PDOException $e) {
            $response->json([
                'message' => 'Database unavailable',
                'error' => $e->getMessage()
            ], 503);
        }
    }
}
