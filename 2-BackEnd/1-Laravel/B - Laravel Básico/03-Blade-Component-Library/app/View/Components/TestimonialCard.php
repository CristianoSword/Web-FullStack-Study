<?php

namespace App\View\Components;

use App\Models\Testimonial;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class TestimonialCard extends Component
{
    public function __construct(
        public Testimonial $testimonial
    ) {
    }

    public function render(): View|Closure|string
    {
        return view('components.testimonial-card');
    }
}
