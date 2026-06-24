<?php

namespace App\Http\Controllers;

use App\Support\BlogSeedPlan;
use Illuminate\View\View;

class SeedPreviewController extends Controller
{
    public function __invoke(): View
    {
        $plan = new BlogSeedPlan();

        return view('pages.seed-preview', [
            'title' => 'Preview do plano de seed',
            'defaults' => $plan->defaults(),
            'counts' => $plan->entityCounts(),
            'commentWindow' => $plan->commentWindow(),
        ]);
    }
}
