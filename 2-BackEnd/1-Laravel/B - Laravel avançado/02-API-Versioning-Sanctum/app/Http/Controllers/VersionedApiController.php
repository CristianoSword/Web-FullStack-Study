<?php

namespace App\Http\Controllers;

use App\Support\ApiVersionWorkspace;
use App\Support\ConfigVersionedCatalog;
use App\Support\SanctumVersionGate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

    public function __invoke(Request $request, string $version): JsonResponse
    {
        $token = (string) $request->bearerToken();
        $resolved = $this->workspace->resolve($version, $token ?: null);

        if (! $resolved['authorized']) {
            return response()->json([
                'message' => 'Unauthorized token for demo API.',
                'version' => $version,
            ], 401);
        }

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
