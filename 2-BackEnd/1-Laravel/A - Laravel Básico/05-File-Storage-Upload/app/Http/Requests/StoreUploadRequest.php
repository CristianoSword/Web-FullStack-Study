<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUploadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'uploaded_by' => trim((string) $this->input('uploaded_by', 'Equipe interna')),
            'category' => trim((string) $this->input('category')),
        ]);
    }

    public function rules(): array
    {
        $allowedCategories = array_column(config('files.categories', []), 'key');
        $allowedMimes = implode(',', config('files.allowed_mimes', []));

        return [
            'uploaded_by' => ['required', 'string', 'min:3', 'max:120'],
            'category' => ['required', 'string', Rule::in($allowedCategories)],
            'document' => [
                'required',
                'file',
                'max:' . (int) config('files.max_upload_kb', 2048),
                'mimetypes:' . $allowedMimes,
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'document.required' => 'Escolha um arquivo para enviar.',
            'document.mimetypes' => 'Use PDF, JPG, PNG ou DOCX.',
            'document.max' => 'O arquivo ultrapassa o tamanho permitido.',
            'category.in' => 'Selecione uma categoria valida.',
        ];
    }
}
