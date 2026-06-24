<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ActivateTenantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'tenant_id' => trim((string) $this->input('tenant_id')),
        ]);
    }

    public function rules(): array
    {
        $tenantIds = array_column(config('tenancy.tenants', []), 'id');

        return [
            'tenant_id' => ['required', 'string', Rule::in($tenantIds)],
        ];
    }
}
