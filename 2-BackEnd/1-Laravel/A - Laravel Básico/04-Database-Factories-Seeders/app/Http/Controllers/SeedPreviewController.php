<?php

namespace App\Http\Controllers;

use App\Http\Requests\SeedPreviewRequest;
use App\Support\BlogSeedPlan;
use Illuminate\View\View;

class SeedPreviewController extends Controller
{
    public function __invoke(SeedPreviewRequest $request): View
    {
        $plan = new BlogSeedPlan();
        $validated = $request->validated();
        $resolved = $plan->resolve($validated);

        return view('pages.seed-preview', [
            'title' => 'Preview do plano de seed',
            'defaults' => $plan->defaults(),
            'counts' => $resolved['counts'],
            'commentWindow' => $resolved['comments'],
            'filters' => $validated,
        ]);
    }
}
