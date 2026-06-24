@extends('layouts.app')

@section('content')
    <section class="hero-card">
        <span class="eyebrow">Database per tenant</span>
        <h1>Mapa operacional de isolamento por cliente</h1>
        <p>Uma base para estudar separacao entre banco central, tenants provisionados e workspaces que operam em ambientes diferentes.</p>
    </section>

    <section class="active-card">
        <span class="eyebrow">Tenant ativo</span>
        <h2>{{ $activeTenant?->name }}</h2>
        <p>{{ $activeTenant?->database }} · {{ $activeTenant?->region }} · {{ $activeTenant?->status }}</p>

        <form class="switch-form" method="POST" action="{{ route('tenancy.activate') }}">
            @csrf
            <select name="tenant_id">
                @foreach ($tenants as $tenant)
                    <option value="{{ $tenant->id }}" @selected($activeTenant?->id === $tenant->id)>{{ $tenant->name }}</option>
                @endforeach
            </select>
            <button type="submit">Ativar tenant</button>
        </form>
    </section>

    <section class="content-grid">
        <section class="tenant-card">
            <h2>Tenants</h2>
            <div class="tenant-list">
                @foreach ($tenants as $tenant)
                    <article class="tenant-item {{ $activeTenant?->id === $tenant->id ? 'tenant-item-active' : '' }}">
                        <strong>{{ $tenant->name }}</strong>
                        <span>{{ $tenant->database }}</span>
                        <p>{{ $tenant->region }} · {{ $tenant->status }}</p>
                    </article>
                @endforeach
            </div>
        </section>

        <section class="workspace-card">
            <h2>Workspaces</h2>
            <div class="workspace-list">
                @foreach ($workspaces as $workspace)
                    <article class="workspace-item">
                        <strong>{{ $workspace->slug }}</strong>
                        <span>{{ $workspace->owner }}</span>
                        <p>{{ $workspace->environment }}</p>
                    </article>
                @endforeach
            </div>
        </section>
    </section>
@endsection
