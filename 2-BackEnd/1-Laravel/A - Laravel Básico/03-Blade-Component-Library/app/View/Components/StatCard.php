<?php

namespace App\View\Components;

use App\Models\Metric;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class StatCard extends Component
{
    public function __construct(
        public Metric $metric
    ) {
    }

    public function render(): View|Closure|string
    {
        return view('components.stat-card');
    }
}
