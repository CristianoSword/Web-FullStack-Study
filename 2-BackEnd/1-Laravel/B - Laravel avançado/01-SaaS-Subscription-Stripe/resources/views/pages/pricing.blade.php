@extends('layouts.app')

@section('content')
    <section class="hero-card">
        <span class="eyebrow">Stripe billing</span>
        <h1>Planos recorrentes prontos para um SaaS em Laravel</h1>
        <p>Uma base didatica para estudar catalogo de planos, trial, upgrade de assinatura e cobranca recorrente com uma experiencia parecida com Cashier.</p>
    </section>

    <section class="plan-grid">
        @foreach ($plans as $plan)
            <article class="plan-card {{ $plan->highlighted ? 'plan-card-highlighted' : '' }}">
                <span class="plan-name">{{ $plan->name }}</span>
                <strong>R$ {{ number_format($plan->priceInCents / 100, 2, ',', '.') }}/{{ $plan->interval }}</strong>
                <p>{{ $plan->headline }}</p>

                <ul>
                    @foreach ($plan->features as $feature)
                        <li>{{ $feature }}</li>
                    @endforeach
                </ul>

                <a href="{{ route('billing.dashboard') }}" class="button">Ver dashboard</a>
            </article>
        @endforeach
    </section>
@endsection
