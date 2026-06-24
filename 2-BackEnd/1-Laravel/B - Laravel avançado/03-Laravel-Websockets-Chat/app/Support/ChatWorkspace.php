<?php

namespace App\Support;

use App\Contracts\ChatCatalog;
use App\Models\ChatMessage;
use App\Models\ChatParticipant;

class ChatWorkspace
{
    public function __construct(
        private readonly ChatCatalog $catalog,
        private readonly ChatTranscriptStore $store,
    ) {
    }

    public function rooms(): array
    {
        return $this->catalog->rooms();
    }

    public function activeRoom(?string $roomId = null)
    {
        $rooms = $this->rooms();
        $selectedId = $roomId ?: $rooms[0]->id;

        foreach ($rooms as $room) {
            if ($room->id === $selectedId) {
                return $room;
            }
        }

        return $rooms[0] ?? null;
    }

    public function participants($room): array
    {
        return array_map(
            static fn (string $member, int $index) => new ChatParticipant(
                name: $member,
                role: $index === 0 ? 'owner' : 'member',
                presence: $index % 2 === 0 ? 'online' : 'away',
            ),
            $room?->members ?? [],
            array_keys($room?->members ?? [])
        );
    }

    public function messages(string $roomId): array
    {
        return array_map(
            static fn (array $message) => new ChatMessage(
                roomId: $message['room_id'],
                author: $message['author'],
                body: $message['body'],
                sentAt: $message['sent_at'],
            ),
            array_values(array_filter(
                $this->store->all(),
                static fn (array $message) => ($message['room_id'] ?? null) === $roomId
            ))
        );
    }

    public function pushMessage(string $roomId, string $author, string $body): void
    {
        $this->store->append([
            'room_id' => $roomId,
            'author' => $author,
            'body' => $body,
            'sent_at' => now()->format('H:i'),
        ]);
    }
}
