<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUploadRequest;
use App\Support\JsonUploadIndex;
use App\Support\LocalUploadCatalog;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class FileUploadController extends Controller
{
    private readonly LocalUploadCatalog $catalog;

    public function __construct()
    {
        $this->catalog = new LocalUploadCatalog(
            new JsonUploadIndex(storage_path('app/private/indexes/uploads.json'))
        );
    }

    public function index(): View
    {
        return view('pages.index', [
            'title' => 'Upload local de arquivos',
            'categories' => $this->catalog->categories(),
            'uploads' => $this->catalog->list(),
        ]);
    }

    public function store(StoreUploadRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $file = $request->file('document');

        $this->catalog->store(
            $file,
            $validated['category'],
            $validated['uploaded_by']
        );

        return redirect()
            ->route('files.index')
            ->with('success', 'Arquivo enviado com sucesso.');
    }

    public function download(string $id): Response
    {
        $upload = $this->catalog->find($id);

        abort_unless($upload !== null, 404);

        return response()->download(
            storage_path('app/private/uploads/' . $upload->storedName),
            $upload->originalName
        );
    }
}
