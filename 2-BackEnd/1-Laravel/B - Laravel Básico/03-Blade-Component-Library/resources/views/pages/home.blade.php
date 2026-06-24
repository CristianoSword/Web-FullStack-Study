@extends('layouts.app')

@section('content')
    <x-hero-section
        :tagline="$siteMeta['tagline']"
        :title="$siteMeta['hero_title']"
        :copy="$siteMeta['hero_copy']"
        :primary-label="$siteMeta['cta_primary']"
        :primary-href="route('site.contact')"
        :secondary-label="$siteMeta['cta_secondary']"
        :secondary-href="route('site.services')"
    />

    <section class="content-section">
        <div class="section-heading">
            <span class="section-kicker">Metricas</span>
            <h2>Resultados traduzidos em blocos visuais simples</h2>
        </div>

        <div class="stats-grid">
            @foreach ($metrics as $metric)
                <x-stat-card :metric="$metric" />
            @endforeach
        </div>
    </section>

    <section class="content-section">
        <div class="section-heading">
            <span class="section-kicker">Servicos</span>
            <h2>Secoes prontas para contar o valor do seu produto</h2>
        </div>

        <div class="feature-grid">
            @foreach ($services as $service)
                <x-feature-card :service="$service" />
            @endforeach
        </div>
    </section>

    <section class="content-section">
        <div class="section-heading">
            <span class="section-kicker">Depoimentos</span>
            <h2>Prova social integrada ao mesmo sistema de componentes</h2>
        </div>

        <div class="testimonial-grid">
            @foreach ($testimonials as $testimonial)
                <x-testimonial-card :testimonial="$testimonial" />
            @endforeach
        </div>
    </section>
@endsection
