<?php

namespace App\View\Components;

use App\Models\ServiceFeature;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class FeatureCard extends Component
{
    public function __construct(
        public ServiceFeature $service
    ) {
    }

    public function render(): View|Closure|string
    {
        return view('components.feature-card');
    }
}
