<?php

namespace App\Http\Controllers;

use App\Contracts\ProvidesInstitutionalContent;
use App\Http\Requests\ContactLeadRequest;
use App\Support\ConfigInstitutionalContent;
use App\Support\LeadCaptureStore;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class SiteController extends Controller
{
    private readonly ProvidesInstitutionalContent $content;

    private readonly LeadCaptureStore $leadCaptureStore;

    public function __construct(
        ?ProvidesInstitutionalContent $content = null,
        ?LeadCaptureStore $leadCaptureStore = null,
    ) {
        $this->content = $content ?? new ConfigInstitutionalContent();
        $this->leadCaptureStore = $leadCaptureStore ?? new LeadCaptureStore(
            storage_path('app/private/contact-leads.json')
        );
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

    public function submitContact(ContactLeadRequest $request): RedirectResponse
    {
        $payload = $request->validated();

        $this->leadCaptureStore->append([
            ...$payload,
            'submitted_at' => now()->toIso8601String(),
        ]);

        return redirect()
            ->route('site.contact')
            ->with('success', 'Interesse enviado com sucesso. Vamos retornar em breve.');
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
