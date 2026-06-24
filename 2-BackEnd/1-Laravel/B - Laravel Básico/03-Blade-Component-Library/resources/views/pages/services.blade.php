@extends('layouts.app')

@section('content')
    <section class="page-intro">
        <span class="section-kicker">Biblioteca</span>
        <h1>Servicos e blocos reutilizaveis para um site institucional moderno</h1>
        <p>Esta pagina mostra como o mesmo conjunto de componentes pode sustentar paginas diferentes sem duplicar estrutura.</p>
    </section>

    <section class="feature-grid">
        @foreach ($services as $service)
            <x-feature-card :service="$service" />
        @endforeach
    </section>
@endsection
