@extends('layouts.app')

@section('content')
    <section class="hero-card">
        <span class="eyebrow">Redis queue</span>
        <h1>Orquestracao de workers para envios em lote</h1>
        <p>Uma vitrine didatica para estudar batches, throughput de workers e fila separada entre notificacoes prioritarias e campanhas grandes.</p>
    </section>

    <section class="metric-grid">
        @foreach ($metrics as $metric)
            <article class="metric-card">
                <strong>{{ $metric->value }}</strong>
                <span>{{ $metric->name }}</span>
                <p>{{ $metric->detail }}</p>
            </article>
        @endforeach
    </section>

    <section class="content-grid">
        <section class="dispatch-card">
            <h2>Disparar campanha</h2>
            <form class="dispatch-form">
                <label>
                    Nome da campanha
                    <input type="text" placeholder="Newsletter de produto">
                </label>

                <label>
                    Volume de jobs
                    <input type="number" placeholder="2500">
                </label>

                <button type="button">Enfileirar lote</button>
            </form>
        </section>

        <section class="batch-card">
            <div class="batch-header">
                <h2>Lotes recentes</h2>
                <span>{{ count($batches) }} itens</span>
            </div>

            <div class="batch-list">
                @forelse ($batches as $batch)
                    <article class="batch-item">
                        <strong>{{ $batch->campaign }}</strong>
                        <span>{{ $batch->jobCount }} jobs · {{ $batch->status }}</span>
                        <p>{{ $batch->queuedAt }}</p>
                    </article>
                @empty
                    <p class="empty-state">Nenhum lote enfileirado ainda.</p>
                @endforelse
            </div>
        </section>
    </section>
@endsection
