<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class HeroSection extends Component
{
    public function __construct(
        public string $tagline,
        public string $title,
        public string $copy,
        public string $primaryLabel,
        public string $primaryHref,
        public string $secondaryLabel,
        public string $secondaryHref,
    ) {
    }

    public function render(): View|Closure|string
    {
        return view('components.hero-section');
    }
}
