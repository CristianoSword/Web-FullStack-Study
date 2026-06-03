<?php

namespace Core;

class Validator
{
    private array $errors = [];

    public function validate(array $data, array $rules): bool
    {
        foreach ($rules as $field => $ruleset) {
            $value = $data[$field] ?? null;
            $ruleArray = explode('|', $ruleset);

            foreach ($ruleArray as $rule) {
                if ($rule === 'required' && empty($value)) {
                    $this->addError($field, "The {$field} field is required.");
                }
                if ($rule === 'email' && !empty($value) && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    $this->addError($field, "The {$field} field must be a valid email address.");
                }
                if (strpos($rule, 'min:') === 0 && !empty($value)) {
                    $min = (int)substr($rule, 4);
                    if (strlen($value) < $min) {
                        $this->addError($field, "The {$field} field must be at least {$min} characters long.");
                    }
                }
            }
        }

        return empty($this->errors);
    }

    public function addError(string $field, string $message): void
    {
        $this->errors[$field][] = $message;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}
