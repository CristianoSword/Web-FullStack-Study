<?php
namespace App;

class ProductController
{
    public function __construct(private ProductRepository $repo) {}

    public function index(): void
    {
        $products = array_map(fn($p) => $p->toArray(), $this->repo->findAll());
        $this->json(['data' => $products]);
    }

    public function show(int $id): void
    {
        $product = $this->repo->findById($id);
        if (!$product) {
            $this->json(['error' => 'Product not found'], 404);
            return;
        }
        $this->json(['data' => $product->toArray()]);
    }

    public function store(): void
    {
        $body = $this->parseBody();
        if (!isset($body['name'], $body['price'])) {
            $this->json(['error' => 'name and price are required'], 422);
            return;
        }
        $product = $this->repo->create($body);
        $this->json(['data' => $product->toArray()], 201);
    }

    public function update(int $id): void
    {
        $body = $this->parseBody();
        if (!isset($body['name'], $body['price'])) {
            $this->json(['error' => 'name and price are required'], 422);
            return;
        }
        $product = $this->repo->update($id, $body);
        if (!$product) {
            $this->json(['error' => 'Product not found'], 404);
            return;
        }
        $this->json(['data' => $product->toArray()]);
    }

    public function destroy(int $id): void
    {
        if (!$this->repo->delete($id)) {
            $this->json(['error' => 'Product not found'], 404);
            return;
        }
        $this->json(['message' => 'Product deleted successfully']);
    }

    private function parseBody(): array
    {
        $raw = file_get_contents('php://input');
        return json_decode($raw, true) ?? [];
    }

    private function json(array $data, int $code = 200): void
    {
        http_response_code($code);
        echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }
}
