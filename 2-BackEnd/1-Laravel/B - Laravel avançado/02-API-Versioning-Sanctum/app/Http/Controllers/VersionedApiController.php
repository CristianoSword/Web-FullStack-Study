<?php

namespace App\Http\Controllers;

use App\Http\Requests\VersionedCatalogRequest;
use App\Support\ApiVersionWorkspace;
use App\Support\ConfigVersionedCatalog;
use App\Support\SanctumVersionGate;
use Illuminate\Http\JsonResponse;

class VersionedApiController extends Controller
{
    private readonly ApiVersionWorkspace $workspace;

    public function __construct()
    {
        $this->workspace = new ApiVersionWorkspace(
            new ConfigVersionedCatalog(),
            new SanctumVersionGate()
        );
    }

    public function __invoke(VersionedCatalogRequest $request, string $version): JsonResponse
    {
        $validated = $request->validated();
        $resolved = $this->workspace->resolve($version, $validated['token']);

        return response()->json([
            'version' => $resolved['version'],
            'consumer' => $resolved['consumer']?->name,
            'abilities' => $resolved['consumer']?->abilities,
            'resources' => array_map(
                static fn ($resource) => [
                    'id' => $resource->id,
                    'title' => $resource->title,
                    'status' => $resource->status,
                    'payload' => $resource->payload,
                ],
                $resolved['resources']
            ),
        ]);
    }
}
