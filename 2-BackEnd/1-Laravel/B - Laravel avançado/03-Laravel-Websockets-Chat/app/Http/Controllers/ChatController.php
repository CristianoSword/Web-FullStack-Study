<?php

namespace App\Http\Controllers;

use App\Support\ChatTranscriptStore;
use App\Support\ChatWorkspace;
use App\Support\ConfigChatCatalog;
use Illuminate\View\View;

class ChatController extends Controller
{
    private readonly ChatWorkspace $workspace;

    public function __construct()
    {
        $this->workspace = new ChatWorkspace(
            new ConfigChatCatalog(),
            new ChatTranscriptStore(storage_path('app/private/chat-transcript.json'))
        );
    }

    public function index(): View
    {
        $room = $this->workspace->activeRoom();

        return view('pages.chat', [
            'title' => 'Realtime Chat',
            'rooms' => $this->workspace->rooms(),
            'activeRoom' => $room,
            'participants' => $this->workspace->participants($room),
            'messages' => $room ? $this->workspace->messages($room->id) : [],
        ]);
    }
}
