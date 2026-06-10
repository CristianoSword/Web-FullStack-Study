<?php
namespace App;

abstract class Job
{
    protected array $payload = [];

    public function __construct(array $payload = [])
    {
        $this->payload = $payload;
    }

    abstract public function handle(): void;

    public function getPayload(): array
    {
        return $this->payload;
    }

    public function getPayloadValue(string $key, $default = null)
    {
        return $this->payload[$key] ?? $default;
    }
}
