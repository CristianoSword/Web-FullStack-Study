@extends('layouts.app')

@section('content')
    <section class="dashboard-grid">
        <article class="summary-card">
            <span class="eyebrow">Conta atual</span>
            <h1>{{ $customer->company }}</h1>
            <p>{{ $customer->name }} · {{ $customer->email }}</p>

            <div class="summary-chip-row">
                <span class="chip">{{ $customer->segment }}</span>
                <span class="chip">{{ strtoupper($subscription->status) }}</span>
                @if ($subscription->hasTrial)
                    <span class="chip">TRIAL</span>
                @endif
            </div>
        </article>

        <article class="summary-card">
            <span class="eyebrow">Assinatura</span>
            <h2>{{ $selectedPlan?->name }}</h2>
            <p>Renovacao prevista em {{ $subscription->renewalDate }}</p>
            <a href="{{ route('billing.pricing') }}" class="button button-secondary">Comparar planos</a>
        </article>
    </section>

    <section class="plan-grid">
        @foreach ($plans as $plan)
            <article class="plan-card {{ $selectedPlan?->id === $plan->id ? 'plan-card-highlighted' : '' }}">
                <span class="plan-name">{{ $plan->name }}</span>
                <strong>R$ {{ number_format($plan->priceInCents / 100, 2, ',', '.') }}/{{ $plan->interval }}</strong>
                <p>{{ $plan->headline }}</p>
            </article>
        @endforeach
    </section>
@endsection
