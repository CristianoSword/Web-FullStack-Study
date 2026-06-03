<?php

namespace Core;

class Response
{
    public function setStatusCode(int $code): void
    {
        http_response_code($code);
    }

    public function redirect(string $url): void
    {
        header("Location: " . $url);
        exit;
    }

    public function json(array $data, int $code = 200): void
    {
        $this->setStatusCode($code);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
}
