<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VersionedCatalogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'version' => (string) $this->route('version'),
            'token' => (string) $this->bearerToken(),
        ]);
    }

    public function rules(): array
    {
        $tokens = array_column(config('api_versions.tokens', []), 'token');

        return [
            'version' => ['required', 'string', Rule::in(['v1', 'v2'])],
            'token' => ['required', 'string', Rule::in($tokens)],
        ];
    }

    public function messages(): array
    {
        return [
            'token.required' => 'Envie um bearer token para acessar o catalogo.',
            'token.in' => 'O token informado nao faz parte do ambiente de demonstracao.',
        ];
    }
}
