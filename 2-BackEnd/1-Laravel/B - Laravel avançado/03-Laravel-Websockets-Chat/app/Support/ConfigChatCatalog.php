<?php

namespace App\Support;

use App\Contracts\ChatCatalog;
use App\Models\ChatRoom;

class ConfigChatCatalog implements ChatCatalog
{
    public function rooms(): array
    {
        return array_map(
            static fn (array $room) => new ChatRoom(
                id: $room['id'],
                name: $room['name'],
                visibility: $room['visibility'],
                members: $room['members'],
            ),
            config('chat.rooms', [])
        );
    }
}
