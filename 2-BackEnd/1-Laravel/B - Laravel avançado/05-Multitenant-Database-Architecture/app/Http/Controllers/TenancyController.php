<?php

namespace App\Http\Controllers;

use App\Support\ConfigTenantRegistry;
use App\Support\TenancyWorkspace;
use Illuminate\View\View;

class TenancyController extends Controller
{
    private readonly TenancyWorkspace $workspace;

    public function __construct()
    {
        $this->workspace = new TenancyWorkspace(new ConfigTenantRegistry());
    }

    public function index(): View
    {
        return view('pages.tenancy', [
            'title' => 'Multitenant Architecture',
            'tenants' => $this->workspace->tenants(),
            'activeTenant' => $this->workspace->activeTenant(),
            'workspaces' => $this->workspace->workspaces(),
        ]);
    }
}
