<?php

namespace Core;

class Router
{
    private Request $request;
    private Response $response;
    private array $routes = [];

    public function __construct(Request $request, Response $response)
    {
        $this->request = $request;
        $this->response = $response;
    }

    public function get(string $path, $callback): void
    {
        $this->routes['get'][$path] = $callback;
    }

    public function post(string $path, $callback): void
    {
        $this->routes['post'][$path] = $callback;
    }

    public function resolve()
    {
        $path = $this->request->getPath();
        $method = $this->request->getMethod();
        $callback = $this->routes[$method][$path] ?? false;

        if ($callback === false) {
            $this->response->setStatusCode(404);
            echo "404 - Not Found";
            return;
        }

        // If callback is a string (like "HomeController@index")
        if (is_string($callback)) {
            $parts = explode('@', $callback);
            $controllerName = "\\App\\Controllers\\" . $parts[0];
            $action = $parts[1];

            if (class_exists($controllerName)) {
                $controller = new $controllerName();
                return call_user_func([$controller, $action], $this->request, $this->response);
            }
        }

        // If callback is a closure/function
        if (is_callable($callback)) {
            return call_user_func($callback, $this->request, $this->response);
        }

        $this->response->setStatusCode(500);
        echo "500 - Internal Server Error";
    }
}
