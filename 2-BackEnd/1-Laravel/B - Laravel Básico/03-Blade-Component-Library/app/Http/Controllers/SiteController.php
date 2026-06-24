<?php

namespace App\Http\Controllers;

use App\Contracts\ProvidesInstitutionalContent;
use Illuminate\View\View;

class SiteController extends Controller
{
    public function __construct(
        private readonly ProvidesInstitutionalContent $content
    ) {
    }

    public function home(): View
    {
        return view('pages.home', [
            ...$this->sharedPayload(),
            'services' => array_slice($this->content->getServices(), 0, 3),
            'metrics' => $this->content->getMetrics(),
            'testimonials' => $this->content->getTestimonials(),
        ]);
    }

    public function services(): View
    {
        return view('pages.services', [
            ...$this->sharedPayload(),
            'services' => $this->content->getServices(),
        ]);
    }

    public function contact(): View
    {
        return view('pages.contact', [
            ...$this->sharedPayload(),
            'contactChannels' => $this->content->getContactChannels(),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function sharedPayload(): array
    {
        return [
            'siteMeta' => $this->content->getSiteMeta(),
            'navigation' => $this->content->getNavigation(),
            'contactChannels' => $this->content->getContactChannels(),
        ];
    }
}
