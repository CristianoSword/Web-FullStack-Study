@extends('layouts.app')

@section('content')
    <section class="hero-card">
        <span class="eyebrow">Laravel factories</span>
        <h1>Preview do seed para blog editorial</h1>
        <p>Uma pagina de apoio para entender rapidamente quantos registros serao gerados, quais estados existem e como as relacoes se conectam.</p>
    </section>

    <section class="metric-grid">
        <article class="metric-card">
            <strong>{{ $counts['authors'] }}</strong>
            <span>Autores</span>
        </article>
        <article class="metric-card">
            <strong>{{ $counts['categories'] }}</strong>
            <span>Categorias</span>
        </article>
        <article class="metric-card">
            <strong>{{ $counts['posts'] }}</strong>
            <span>Posts</span>
        </article>
        <article class="metric-card">
            <strong>{{ $commentWindow['min'] }} - {{ $commentWindow['max'] }}</strong>
            <span>Comentarios por post</span>
        </article>
    </section>

    <section class="panel-grid">
        <article class="panel-card">
            <h2>Estados de autores</h2>
            <ul>
                @foreach ($defaults['states']['author_roles'] as $role)
                    <li>{{ $role }}</li>
                @endforeach
            </ul>
        </article>

        <article class="panel-card">
            <h2>Estados de posts</h2>
            <ul>
                @foreach ($defaults['states']['post_statuses'] as $status)
                    <li>{{ $status }}</li>
                @endforeach
            </ul>
        </article>

        <article class="panel-card">
            <h2>Paleta de categorias</h2>
            <ul>
                @foreach ($defaults['states']['category_palette'] as $color)
                    <li>{{ $color }}</li>
                @endforeach
            </ul>
        </article>
    </section>

    <section class="relationship-card">
        <h2>Relacoes que o seed cria</h2>
        <ol>
            <li>Autores escrevem varios posts.</li>
            <li>Cada post recebe uma categoria aleatoria.</li>
            <li>Cada post ganha uma janela variavel de comentarios.</li>
            <li>Os posts publicados ja saem com `published_at` preenchido.</li>
        </ol>
    </section>
@endsection
