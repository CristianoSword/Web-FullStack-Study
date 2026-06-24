@extends('layouts.app')

@section('content')
    <section class="hero-card">
        <span class="eyebrow">Laravel storage</span>
        <h1>Painel simples para upload e download local</h1>
        <p>Uma base didatica para estudar entrada de arquivos, categorias, persistencia local de metadados e acesso posterior via download.</p>
    </section>

    <section class="content-grid">
        <form class="upload-card" method="POST" action="{{ route('files.store') }}" enctype="multipart/form-data">
            @csrf

            <label>
                Responsavel pelo envio
                <input type="text" name="uploaded_by" placeholder="Equipe interna">
            </label>

            <label>
                Categoria
                <select name="category">
                    @foreach ($categories as $category)
                        <option value="{{ $category->key }}">{{ $category->label }}</option>
                    @endforeach
                </select>
            </label>

            <label>
                Arquivo
                <input type="file" name="document">
            </label>

            <button type="submit">Enviar arquivo</button>
        </form>

        <section class="info-card">
            <h2>Categorias</h2>

            <div class="category-list">
                @foreach ($categories as $category)
                    <article class="category-item">
                        <strong>{{ $category->label }}</strong>
                        <p>{{ $category->description }}</p>
                    </article>
                @endforeach
            </div>
        </section>
    </section>

    <section class="table-card">
        <div class="table-header">
            <h2>Arquivos enviados</h2>
            <span>{{ count($uploads) }} itens</span>
        </div>

        <div class="upload-list">
            @forelse ($uploads as $upload)
                <article class="upload-row">
                    <div>
                        <strong>{{ $upload->originalName }}</strong>
                        <p>{{ $upload->uploadedBy }} · {{ $upload->category }}</p>
                    </div>

                    <div>
                        <span>{{ number_format($upload->size / 1024, 1) }} KB</span>
                        <a href="{{ route('files.download', $upload->id) }}">Download</a>
                    </div>
                </article>
            @empty
                <p class="empty-state">Nenhum arquivo enviado ainda.</p>
            @endforelse
        </div>
    </section>
@endsection
