<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DispatchBatchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'campaign' => trim((string) $this->input('campaign')),
            'job_count' => (int) $this->input('job_count'),
        ]);
    }

    public function rules(): array
    {
        return [
            'campaign' => ['required', 'string', 'min:4', 'max:120'],
            'job_count' => ['required', 'integer', 'min:10', 'max:50000'],
        ];
    }
}
