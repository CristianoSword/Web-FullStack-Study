@extends('layout')

@section('title', 'Editar Post')

@section('content')
    <a href="{{ route('posts.index') }}" class="btn btn-primary">Voltar</a>
    
    <form action="{{ route('posts.update', $post) }}" method="POST">
        @csrf
        @method('PUT')
        
        <label>Título:</label>
        <input type="text" name="title" value="{{ $post->title }}" required>
        
        <label>Autor:</label>
        <input type="text" name="author" value="{{ $post->author }}" required>
        
        <label>Conteúdo:</label>
        <textarea name="content" required>{{ $post->content }}</textarea>
        
        <button type="submit" class="btn btn-success">Atualizar</button>
    </form>
@endsection
