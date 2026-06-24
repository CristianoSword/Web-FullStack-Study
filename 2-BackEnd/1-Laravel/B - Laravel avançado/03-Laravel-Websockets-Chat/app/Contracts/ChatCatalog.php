<?php

namespace App\Contracts;

interface ChatCatalog
{
    /**
     * @return array<int, \App\Models\ChatRoom>
     */
    public function rooms(): array;
}
