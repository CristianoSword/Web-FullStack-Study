<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActivateTenantRequest;
use App\Support\ConfigTenantRegistry;
use App\Support\TenancyWorkspace;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class TenancyController extends Controller
{
    private readonly TenancyWorkspace $workspace;

    public function __construct()
    {
        $this->workspace = new TenancyWorkspace(new ConfigTenantRegistry());
    }

    public function index(Request $request): View
    {
        $tenantId = $request->query('tenant');

        return view('pages.tenancy', [
            'title' => 'Multitenant Architecture',
            'tenants' => $this->workspace->tenants(),
            'activeTenant' => $this->workspace->activeTenant($tenantId),
            'workspaces' => $this->workspace->workspaces(),
        ]);
    }

    public function activate(ActivateTenantRequest $request): RedirectResponse
    {
        $tenantId = $request->validated()['tenant_id'];

        return redirect()
            ->route('tenancy.index', ['tenant' => $tenantId])
            ->with('success', 'Tenant ativo alterado para fins de roteamento e isolamento.');
    }
}
