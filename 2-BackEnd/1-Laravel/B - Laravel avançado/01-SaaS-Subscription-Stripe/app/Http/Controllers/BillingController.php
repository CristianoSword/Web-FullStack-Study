<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Support\ConfigBillingCatalog;
use App\Support\SaaSBillingWorkspace;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class BillingController extends Controller
{
    private readonly SaaSBillingWorkspace $workspace;

    public function __construct()
    {
        $this->workspace = new SaaSBillingWorkspace(new ConfigBillingCatalog());
    }

    public function pricing(): View
    {
        return view('pages.pricing', [
            'title' => 'Planos SaaS',
            'plans' => $this->workspace->plans(),
            'customer' => $this->workspace->sampleCustomer(),
            'subscription' => $this->workspace->currentSubscription(),
            'selectedPlan' => $this->workspace->selectedPlan(),
        ]);
    }

    public function dashboard(): View
    {
        return view('pages.dashboard', [
            'title' => 'Billing dashboard',
            'plans' => $this->workspace->plans(),
            'customer' => $this->workspace->sampleCustomer(),
            'subscription' => $this->workspace->currentSubscription(),
            'selectedPlan' => $this->workspace->selectedPlan(),
        ]);
    }

    public function checkout(CheckoutRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $plan = $this->workspace->selectedPlan($validated['plan_id']);

        return redirect()
            ->route('billing.dashboard')
            ->with('success', sprintf(
                'Checkout simulado iniciado para o plano %s usando %s.',
                $plan?->name ?? $validated['plan_id'],
                $validated['email']
            ));
    }
}
