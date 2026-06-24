<?php

namespace App\Http\Controllers;

use App\Support\JsonQueueBatchStore;
use App\Support\QueueLabWorkspace;
use Illuminate\View\View;

class QueueLabController extends Controller
{
    private readonly QueueLabWorkspace $workspace;

    public function __construct()
    {
        $this->workspace = new QueueLabWorkspace(
            new JsonQueueBatchStore(storage_path('app/private/queue-batches.json'))
        );
    }

    public function index(): View
    {
        return view('pages.queue-lab', [
            'title' => 'Queue Workers',
            'metrics' => $this->workspace->metrics(),
            'batches' => $this->workspace->batches(),
        ]);
    }
}
