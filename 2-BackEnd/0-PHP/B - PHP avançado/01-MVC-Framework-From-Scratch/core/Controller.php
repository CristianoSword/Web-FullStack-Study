<?php

namespace Core;

abstract class Controller
{
    public function render(string $view, array $data = []): void
    {
        // Extract parameters to local variables
        extract($data);

        // Include layout and view
        $viewFile = APP_DIR . "/Views/{$view}.php";
        
        if (file_exists($viewFile)) {
            // Buffer output
            ob_start();
            include_once $viewFile;
            $content = ob_get_clean();

            // Render default layout
            $layoutFile = APP_DIR . "/Views/layouts/main.php";
            if (file_exists($layoutFile)) {
                include_once $layoutFile;
            } else {
                echo $content;
            }
        } else {
            die("View {$view} not found.");
        }
    }
}
