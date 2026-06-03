<?php
namespace App;

class Validator
{
    private array $errors = [];

    public function required(array $data, array $fields): self
    {
        foreach ($fields as $field) {
            if (empty($data[$field])) {
                $this->errors[$field][] = "The '{$field}' field is required.";
            }
        }
        return $this;
    }

    public function numeric(array $data, array $fields): self
    {
        foreach ($fields as $field) {
            if (isset($data[$field]) && !is_numeric($data[$field])) {
                $this->errors[$field][] = "The '{$field}' must be a numeric value.";
            }
        }
        return $this;
    }

    public function min(array $data, string $field, float $min): self
    {
        if (isset($data[$field]) && (float)$data[$field] < $min) {
            $this->errors[$field][] = "The '{$field}' must be at least {$min}.";
        }
        return $this;
    }

    public function passes(): bool
    {
        return empty($this->errors);
    }

    public function errors(): array
    {
        return $this->errors;
    }
}
