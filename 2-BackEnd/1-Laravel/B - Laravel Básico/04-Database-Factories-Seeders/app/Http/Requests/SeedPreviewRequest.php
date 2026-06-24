<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SeedPreviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'authors' => ['nullable', 'integer', 'min:1', 'max:50'],
            'categories' => ['nullable', 'integer', 'min:1', 'max:20'],
            'posts' => ['nullable', 'integer', 'min:1', 'max:200'],
            'comments_min' => ['nullable', 'integer', 'min:0', 'max:20'],
            'comments_max' => ['nullable', 'integer', 'min:1', 'max:40', 'gte:comments_min'],
        ];
    }
}
