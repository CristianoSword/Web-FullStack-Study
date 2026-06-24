<?php

namespace App\Models;

class ChatRoom
{
    /**
     * @param array<int, string> $members
     */
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly string $visibility,
        public readonly array $members,
    ) {
    }
}
