<?php

namespace App\Http\Controllers;

use App\Http\Requests\DispatchBatchRequest;
use App\Support\JsonQueueBatchStore;
use App\Support\QueueLabWorkspace;
use Illuminate\Http\RedirectResponse;
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

    public function store(DispatchBatchRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $this->workspace->dispatchBatch(
            $validated['campaign'],
            $validated['job_count']
        );

        return redirect()
            ->route('queue.index')
            ->with('success', 'Lote enfileirado com sucesso para processamento em background.');
    }
}
