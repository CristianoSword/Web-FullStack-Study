<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => trim((string) $this->input('name')),
            'email' => trim((string) $this->input('email')),
            'goal' => trim((string) $this->input('goal')),
            'message' => trim((string) $this->input('message')),
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'goal' => ['required', 'string', 'in:Landing page,Site institucional,Biblioteca de componentes'],
            'message' => ['required', 'string', 'min:20', 'max:1200'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Informe o nome do responsavel.',
            'email.required' => 'Informe um email para retorno.',
            'goal.in' => 'Escolha um objetivo valido da lista.',
            'message.min' => 'Descreva o desafio com pelo menos 20 caracteres.',
        ];
    }
}
