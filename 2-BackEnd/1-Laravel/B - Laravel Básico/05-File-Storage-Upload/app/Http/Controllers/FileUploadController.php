<?php

namespace App\Http\Controllers;

use App\Support\JsonUploadIndex;
use App\Support\LocalUploadCatalog;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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

    public function store(Request $request)
    {
        $file = $request->file('document');

        if (! $file) {
            return redirect()->route('files.index');
        }

        $this->catalog->store(
            $file,
            (string) $request->input('category', 'reports'),
            (string) $request->input('uploaded_by', 'Equipe interna')
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
