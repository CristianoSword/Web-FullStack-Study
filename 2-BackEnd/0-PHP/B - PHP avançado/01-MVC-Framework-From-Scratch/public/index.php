<?php

// Front Controller - MVC Framework From Scratch

// Display Errors for development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Define constants
define('ROOT_DIR', dirname(__DIR__));
define('APP_DIR', ROOT_DIR . '/app');
define('CORE_DIR', ROOT_DIR . '/core');

// Load Autoloader
if (file_exists(ROOT_DIR . '/vendor/autoload.php')) {
    require_once ROOT_DIR . '/vendor/autoload.php';
} else {
    // Simple custom fallback autoloader if composer dump-autoload hasn't run yet
    spl_autoload_register(function ($class) {
        $prefix = 'App\\';
        $base_dir = APP_DIR . '/';
        $len = strlen($prefix);
        if (strncmp($prefix, $class, $len) !== 0) {
            $prefix = 'Core\\';
            $base_dir = CORE_DIR . '/';
            $len = strlen($prefix);
        }
        if (strncmp($prefix, $class, $len) === 0) {
            $relative_class = substr($class, $len);
            $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';
            if (file_exists($file)) {
                require $file;
            }
        }
    });
}

// Bootstrap Application
$config = require_once ROOT_DIR . '/config/config.php';

use Core\Application;

$app = new Application();

// Define web routes
$app->router->get('/', 'UserController@home');
$app->router->get('/users', 'UserController@index');

// Define API routes
$app->router->get('/api/users', 'UserController@apiUsers');

// Run application
$app->run();
