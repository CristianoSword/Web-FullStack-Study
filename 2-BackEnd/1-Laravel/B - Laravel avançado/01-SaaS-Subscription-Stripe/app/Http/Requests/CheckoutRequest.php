<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CheckoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'plan_id' => trim((string) $this->input('plan_id')),
            'email' => trim((string) $this->input('email')),
        ]);
    }

    public function rules(): array
    {
        $planIds = array_column(config('billing.plans', []), 'id');

        return [
            'plan_id' => ['required', 'string', Rule::in($planIds)],
            'email' => ['required', 'email', 'ends_with:company.com,nebulaops.test,billingharbor.test'],
        ];
    }

    public function messages(): array
    {
        return [
            'plan_id.in' => 'Escolha um plano valido do catalogo.',
            'email.ends_with' => 'Use um email corporativo permitido para o fluxo de demonstracao.',
        ];
    }
}
