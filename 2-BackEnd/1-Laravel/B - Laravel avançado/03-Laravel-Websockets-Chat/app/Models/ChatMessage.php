<?php

namespace App\Models;

class ChatMessage
{
    public function __construct(
        public readonly string $roomId,
        public readonly string $author,
        public readonly string $body,
        public readonly string $sentAt,
    ) {
    }
}
