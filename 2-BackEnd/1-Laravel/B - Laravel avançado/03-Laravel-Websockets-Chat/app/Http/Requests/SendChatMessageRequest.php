<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SendChatMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'room_id' => trim((string) $this->input('room_id')),
            'author' => trim((string) $this->input('author', 'System Bot')),
            'body' => trim((string) $this->input('body')),
        ]);
    }

    public function rules(): array
    {
        $roomIds = array_column(config('chat.rooms', []), 'id');

        return [
            'room_id' => ['required', 'string', Rule::in($roomIds)],
            'author' => ['required', 'string', 'min:3', 'max:80'],
            'body' => ['required', 'string', 'min:4', 'max:400'],
        ];
    }
}
