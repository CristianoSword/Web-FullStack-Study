<?php

namespace App\Http\Controllers;

use App\Support\ConfigBillingCatalog;
use App\Support\SaaSBillingWorkspace;
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
}
