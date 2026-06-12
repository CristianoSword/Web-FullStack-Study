@extends('layout')

@section('title', $post->title)

@section('content')
    <a href="{{ route('posts.index') }}" class="btn btn-primary">Voltar</a>
    
    <h2>{{ $post->title }}</h2>
    <p><strong>Autor:</strong> {{ $post->author }}</p>
    <p><strong>Data:</strong> {{ $post->created_at->format('d/m/Y H:i') }}</p>
    
    <div style="margin: 20px 0; padding: 20px; background: #f9f9f9;">
        {{ $post->content }}
    </div>
    
    <a href="{{ route('posts.edit', $post) }}" class="btn btn-success">Editar</a>
@endsection
