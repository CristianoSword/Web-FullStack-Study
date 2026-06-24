<?php

namespace App\Models;

class ChatParticipant
{
    public function __construct(
        public readonly string $name,
        public readonly string $role,
        public readonly string $presence,
    ) {
    }
}
